/**
 * SummarizerService - 剧情总结核心服务
 * 
 * 提供楼层监听、总结触发、世界书写入等功能
 * 
 * 修复：
 * 1. 使用 WorldBookStateService 存储 lastSummarizedFloor（每聊天独立）
 * 2. 正确获取当前楼层数（context.chat.length）
 * 3. 监听聊天切换事件以重置状态
 */

import { EventBus, TavernEventType, MessageService, WorldInfoService } from "@/tavern/api";
import { TextProcessor, textProcessor } from './TextProcessor';
import { LLMAdapter, llmAdapter } from './LLMAdapter';
import { RegexProcessor, regexProcessor } from './RegexProcessor';
import { Logger } from "@/lib/logger";
import { ModelLogger } from "@/lib/logger/ModelLogger";
import { notificationService } from '@/services/NotificationService';
import { SettingsManager } from "@/services/settings/Persistence";
import { WorldBookStateService } from '@/tavern/WorldBookState';
import { getCurrentChat, getCurrentChatId, getChatMessages, getCurrentCharacter, getCurrentModel } from '@/tavern/context';
import { hideMessageRange } from '@/tavern/bridge';
import { revisionService } from '@/services/RevisionService';
import type {
    SummarizerConfig,
    SummarizerStatus,
    SummaryResult,
    SummarizeRequest,
} from './types';
import { DEFAULT_SUMMARIZER_CONFIG } from './types';

/** 备用总结提示词模板（APIPresets 无启用模板时使用） */
const FALLBACK_SUMMARY_PROMPT = {
    system: `<system_configuration>
  <role_definition>
    身份: 长篇故事记忆摘要器
    核心任务: 担任超长篇故事的“记忆核心”。接收用户提供的已有剧情原文，先理解“故事元摘要”的宏观视角，然后严格按照时间顺序，并遵照“事件粒度原则”合并同类项，分解为最精简的、服务于长线记忆的关键事件。
    禁令: 绝对禁止创作新内容、剧情推演或添加创意。绝对禁止输出YAML代码块。绝对禁止输出额外解释。
  </role_definition>

  <formatting_protocol>
    输出格式: 纯文本列表。
    事件行格式: 数字序号. [上下文信息] 事件核心描述 (重要性等级 | 权重值)
    宏观时间标记: 【 时间描述文本 】 (单独占一行，无序号)
    上下文信息: [时间 | 地点 | 核心人物] (若缺失则省略，全缺失用[])
  </formatting_protocol>

  <logic_protocol>
    评估基准:
      原则: 所有评估必须以开头提供的“故事元摘要”为基准。
      注意: 一个在当前章节看起来很“关键”的事件（比如找到一个普通线索），从整个故事（元摘要）的尺度看，可能仅仅是“基础”。
    
    时间顺序与锚定:
      首要规则: 严格按照原文的时间流逝顺序排列。
      宏观时间轴: 当剧情发生天数变更、年份跳跃、进入长时段回忆或新的篇章时，必须输出宏观时间标记。
        历法日期: 如“太阳历1023年4月4日”。
        相对日期: 如“第1天”、“第3年”、“数日后”。
      微观时间戳: 在具体事件行中，聚焦于：
        具体时刻: 如 HH:MM (14:30)。
        自然时段: 如 清晨、深夜、正午、黄昏。
        时间流状态: 对于跨越长日期的宏观块，使用 长期（表示持续性动作）、开始、过程、结束、突发 等标记。

    事件粒度原则 (节省Token的核心):
      最高原则: 合并连续的因果链。必须将服务于同一个直接目标、在短时间内连续发生的多个动作和反应，合并成一个单一的、结果导向的事件。
      判定标准: 一场完整的战斗（从接触到结束）、一次完整的谈判、一次完整的潜行侦察，都应被视为一个事件。
      错误示例 (过度细分):
        1: {{user}}发现紫袍人。
        2: {{user}}的潜行被察觉。
        3: {{user}}发起试探攻击...
      正确示例 (合并后的单一事件):
        1: [巢穴深处 | {{user}}, 紫袍人, 援军] {{user}}与紫袍人对峙，但在精神攻击下不敌陷入危机，最终被援军所救。 (推动 | 0.7)

    描述标准 (情报式摘要):
      动词-宾语核心: 砍掉所有不必要的修饰词、副词和从句，只保留事件的核心骨架：“谁，做了什么，对谁/什么”。
        错误: {{user}}在休息区找到了任务委托人——性格古板的药草师赫伯，并确认了任务细节。
        正确: {{user}}与药草师赫伯会面，确认任务。
      结论优先: 对于分析或推断性质的事件，直接给出最终的“结论”，省略思考过程。
        错误: {{user}}结合军事经验将线索串联，推断出哥布林已初具规模...
        正确: {{user}}得出结论：哥布林已成规模并计划扩张。
      状态快照: 对于描述角色状态或关系变化的事件，只记录其最终形成的稳定新状态，而不是描述变化过程。
        错误: 严峻的形势让赫伯彻底信服{{user}}的判断，他在一个岔路口前将决定权完全交给了{{user}}...
        正确: 赫伯完全信服，并将决策权交给{{user}}。
      关键信息保留: 绝不省略对剧情至关重要的专有名词、关键数据或核心发现。不能用模糊的词（如“基础情报”、“某个物品”）来代替具体信息。
        错误: {{user}}获取了基础情报。
        正确: {{user}}获知情报：斯特林集团涉嫌数据伪造。

    重要性分级 (金字塔模型):
      等级一_基础 (Foundation):
        权重: 0.1 - 0.4
        定义: 构成世界和叙事基础的背景、细节和常规互动。绝大多数（>60%）事件都属于此等级。
        伏笔处理: 对于符合“反常细节”或“悬而未决信息”的伏笔，也归于此类，但权重可酌情给予 0.3-0.4，并在描述中用括号注明 (伏笔)。
      等级二_推动 (Propulsion):
        权重: 0.5 - 0.7
        定义: 对某个章节或阶段剧情有实质性推动作用的事件。（占比 <30%）
        示例: 一次成功的关键说服、一次导致主角受伤的战斗、一个关键线索的发现。
      等级三_关键 (Keystone):
        权重: 0.8 - 0.9
        定义: 对长远故事有明确导向性作用的剧情关键节点。（占比 <10%）
        警告: 此等级不适用于故事早期的常规情节推进。
        示例: 关键配角的死亡、重要秘密的揭露、主角团队做出重大战略决策。
      等级四_转折 (Turning Point):
        权重: 1.0
        定义: 极其罕见的、能改变“故事元摘要”核心描述的决定性时刻。（占比 ≈1%）
        示例: 主角的死亡与重生、最终反派的揭晓、世界规则的颠覆。
  </logic_protocol>

  <output_template>
    <think>
      元摘要校准:
        故事基调: \${分析故事的核心类型和当前所处阶段}
        关键伏笔: \${回顾元摘要中提到的未解之谜，以便在摘要中保留相关线索}
      
      时间轴梳理:
        宏观节点识别: \${识别出原文中的日期变更、回忆片段或篇章转换}
        微观时刻提取: \${提取具体事件发生的时间点或自然时段}
      
      事件粒度分析:
        合并同类项: \${将连续的战斗、对话或行动合并为单一事件}
        重要性评估: \${根据金字塔模型，为每个事件评定等级和权重}
      
      格式自查:
        情报式摘要: \${检查是否去除了修饰词，只保留动宾结构}
        关键信息保留: \${确认是否保留了所有专有名词和关键数据}
    </think>

    \${按时间顺序输出宏观时间标记和事件列表}
    【 \${宏观时间描述} 】
    \${数字序号}. [\${微观时间} | \${地点} | \${核心人物}] \${事件核心描述} (\${重要性等级} | \${权重值})
  </output_template>
  
  <example_demonstration>
    输入原文:
      "穿越者A重伤濒死，被B公主发现并施展治愈术救回。B因同情决定暂时收留A，并隐瞒其异界人身份。
      (三年前的回忆) A在B安排下接受高强度骑士训练，习得“基础剑术”。两人确立主仆契约，A正式获得“见习守护骑士”头衔。
      (冒险开始) A使用假名“剑”注册冒险者，并提交了采集药草任务。A在交换情报时引起哥布林杀手注意，获赠“便携粉尘炸弹”。"

    AI输出:
      <think>
        元摘要校准:
          故事基调: \${异世界穿越/骑士成长/主仆羁绊}
          当前进度: \${从穿越初识到冒险起步}
        
        时间轴梳理:
          宏观节点1: \${太阳历1023年春4月4日 (穿越)}
          宏观节点2: \${太阳历1023年-1026年 (磨合期/回忆)}
          宏观节点3: \${第4年-第10天 (冒险开始)}
        
        事件粒度分析:
          事件1: \${A被救 (合并重伤/发现/治疗)} -> 关键
          事件2: \${B收留 (合并同情/决定/隐瞒)} -> 推动
          事件3: \${骑士训练 (合并长期训练过程)} -> 基础
          事件4: \${确立契约 (合并主仆关系确认/获得头衔)} -> 关键
          事件5: \${注册冒险者 (合并假名/注册/接任务)} -> 基础
          事件6: \${获赠炸弹 (合并情报交换/引起注意/获赠)} -> 推动
        
        格式自查:
          情报式摘要: \${去除修饰词，保留核心动宾结构}
          关键信息: \${保留"B"、"见习守护骑士"、"哥布林杀手"等专有名词}
      </think>

      【 太阳历1023年春4月4日 : 穿越 】
      1. [深夜 | 荒野森林 | A, B] 穿越者A重伤濒死，被B公主发现并施展治愈术救回。 (关键 | 0.8)
      2. [深夜 | 临时营地 | A, B] B因同情决定暂时收留A，并隐瞒其异界人身份。 (推动 | 0.6)

      【 太阳历1023年春4月4日-1026年秋9月5日 : 磨合期 (三年前的回忆) 】
      3. [长期 | 王城训练场 | A, 骑士长] A在B安排下接受高强度骑士训练，习得“基础剑术”。 (基础 | 0.4)
      4. [结束 | B寝宫 | A, B] 两人确立主仆契约，A正式获得“见习守护骑士”头衔。 (关键 | 0.8)

      【 第4年-第10天 : 冒险开始 】
      5. [正午 | 边境公会大厅 | A, 接待员] A使用假名“剑”注册冒险者，并提交了采集药草任务。 (基础 | 0.3)
      6. [14:30 | 小镇酒馆 | A, 哥布林杀手] A在交换情报时引起哥布林杀手注意，获赠“便携粉尘炸弹”。 (推动 | 0.7)
  </example_demonstration>
</system_configuration>`,

    user: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
};

/** 元数据 key */
const METADATA_KEY = 'engram';

/** 总结条目关键词 - 用于筛选 Engram 创建的摘要 */
const SUMMARY_ENTRY_KEY = 'engram总结';

/**
 * 获取 SillyTavern 上下文
 */
function getSTContext(): {
    chat: unknown[];
    chatId: string;
    characterId: number;
} | null {
    try {
        return window.SillyTavern?.getContext?.() || null;
    } catch {
        return null;
    }
}

/**
 * 获取 chat_metadata
 */
function getChatMetadata(): Record<string, unknown> | null {
    try {
        // 优先从 context 获取
        const context = window.SillyTavern?.getContext?.();
        if (context?.chat_metadata) {
            return context.chat_metadata;
        }
        // 备用：直接访问全局变量
        // @ts-expect-error - SillyTavern 全局变量
        return window.chat_metadata || null;
    } catch {
        return null;
    }
}

/**
 * 保存聊天（防抖）
 */
function saveChatDebounced(): void {
    try {
        // @ts-expect-error - SillyTavern 全局函数
        window.saveChatDebounced?.();
    } catch {
        console.warn('[Engram] saveChatDebounced 不可用');
    }
}

/**
 * SummarizerService 类
 * 核心总结服务
 */
export class SummarizerService {
    private config: SummarizerConfig;
    private textProcessor: TextProcessor;
    private llmAdapter: LLMAdapter;

    private currentChatId: string | null = null;
    private isRunning = false;
    private isSummarizing = false;
    private unsubscribeMessage: (() => void) | null = null;
    private unsubscribeChat: (() => void) | null = null;
    private summaryHistory: SummaryResult[] = [];

    // 缓存最后总结的楼层，用于同步读取
    private _lastSummarizedFloor: number = 0;

    constructor(
        config?: Partial<SummarizerConfig>,
        processor?: TextProcessor,
        adapter?: LLMAdapter
    ) {
        // 优先使用传入配置，其次加载持久化配置，最后使用默认配置
        const savedConfig = SettingsManager.get('summarizerConfig') as Partial<SummarizerConfig>;
        this.config = { ...DEFAULT_SUMMARIZER_CONFIG, ...savedConfig, ...config };
        this.textProcessor = processor || textProcessor;
        this.llmAdapter = adapter || llmAdapter;
    }

    // ==================== 元数据操作 ====================
    // 注：getInfoFromChatMetadata 和 saveToChatMetadata 原方法保留作为兼容或临时使用，
    // 但主要逻辑已迁移至 WorldBookStateService。

    /**
     * 从当前聊天元数据获取值
     */
    private getFromChatMetadata(key: string): unknown {
        const metadata = getChatMetadata();
        if (!metadata) {
            return undefined;
        }
        if (!metadata.extensions) metadata.extensions = {};
        // @ts-expect-error - 动态访问
        if (!metadata.extensions[METADATA_KEY]) metadata.extensions[METADATA_KEY] = {};
        // @ts-expect-error - 动态访问
        return metadata.extensions[METADATA_KEY][key];
    }

    /**
     * 保存值到当前聊天元数据
     */
    private saveToChatMetadata(key: string, value: unknown): void {
        const metadata = getChatMetadata();
        if (!metadata) return;

        if (!metadata.extensions) metadata.extensions = {};
        // @ts-expect-error - 动态访问
        if (!metadata.extensions[METADATA_KEY]) metadata.extensions[METADATA_KEY] = {};

        // @ts-expect-error - 动态访问
        metadata.extensions[METADATA_KEY][key] = value;

        this.log('debug', `已保存到 chat_metadata: ${key} = ${value}`);
        saveChatDebounced();
    }

    /**
     * 获取上次总结的楼层
     * 优先从 cache 读取，未初始化时(0)尝试从 WB 读取
     */
    private async getLastSummarizedFloor(): Promise<number> {
        // 如果缓存有值，直接返回（假设 initializeForCurrentChat 已调用）
        if (this._lastSummarizedFloor > 0) return this._lastSummarizedFloor;

        // 使用 findExistingWorldbook 避免在只读检查时自动创建世界书
        // 这是一个同步方法，不需要 await
        const worldbook = WorldInfoService.findExistingWorldbook();
        if (!worldbook) return this._lastSummarizedFloor;

        const state = await WorldBookStateService.loadState(worldbook);
        this._lastSummarizedFloor = state.lastSummarizedFloor;
        return this._lastSummarizedFloor;
    }

    /**
     * 设置上次总结的楼层
     * 同时更新内存和持久化存储
     */
    public async setLastSummarizedFloor(floor: number): Promise<void> {
        this._lastSummarizedFloor = floor;

        // 优化：仅在世界书已存在时保存状态
        // 如果世界书不存在（尚未生成任何摘要），则不强制创建，实现"懒加载"
        const worldbook = WorldInfoService.findExistingWorldbook();

        if (!worldbook) {
            this.log('debug', '世界书未创建，跳过保存进度', { floor });
            return;
        }

        await WorldBookStateService.saveState(worldbook, {
            lastSummarizedFloor: floor
        });
    }

    /**

    // ==================== 楼层计算 ====================

    /**
     * 获取当前真实楼层数
     */
    private getCurrentFloor(): number {
        const context = getSTContext();
        if (!context?.chat) {
            return 0;
        }
        // 楼层从0开始计数，所以 length - 1 是最后一楼的索引
        return context.chat.length;
    }

    /**
     * 获取当前聊天 ID
     */
    private getCurrentChatId(): string | null {
        const context = getSTContext();
        return context?.chatId || null;
    }

    // ==================== 生命周期 ====================

    /**
     * 启动服务，开始监听事件
     */
    start(): void {
        if (this.isRunning) {
            this.log('warn', '服务已在运行');
            return;
        }

        // 初始化当前聊天状态
        this.initializeForCurrentChat();

        // 监听消息接收事件
        if (this.config.triggerMode === 'auto') {
            this.unsubscribeMessage = EventBus.on(
                TavernEventType.MESSAGE_RECEIVED,
                this.handleMessageReceived.bind(this)
            );
            this.log('debug', `已订阅事件: ${TavernEventType.MESSAGE_RECEIVED}`);
        }

        // 监听聊天切换事件
        this.unsubscribeChat = EventBus.on(
            TavernEventType.CHAT_CHANGED,
            this.handleChatChanged.bind(this)
        );
        this.log('debug', `已订阅事件: ${TavernEventType.CHAT_CHANGED}`);

        this.isRunning = true;

        const status = this.getStatus();
        this.log('info', '服务已启动', status);
    }

    /**
     * 重置进度 (设置为 0)
     */
    public async resetProgress(): Promise<void> {
        await this.setLastSummarizedFloor(0);
        this.log('info', '进度已重置');
    }

    /**
     * 停止服务
     */
    stop(): void {
        if (this.unsubscribeMessage) {
            this.unsubscribeMessage();
            this.unsubscribeMessage = null;
        }
        if (this.unsubscribeChat) {
            this.unsubscribeChat();
            this.unsubscribeChat = null;
        }
        this.isRunning = false;
        this.log('info', '服务已停止');
    }

    /**
     * 为当前聊天初始化状态
     */
    public async initializeForCurrentChat(): Promise<void> {
        const chatId = this.getCurrentChatId();
        const currentFloor = this.getCurrentFloor();

        // 重置/加载缓存
        this.currentChatId = chatId;
        this.summaryHistory = [];
        this._lastSummarizedFloor = 0; // 先清空，迫使 reload

        const lastSummarized = await this.getLastSummarizedFloor(); // 这会更新 _lastSummarizedFloor

        this.log('info', '初始化当前聊天状态', {
            chatId,
            currentFloor,
            lastSummarizedFloor: lastSummarized,
            pendingFloors: currentFloor - lastSummarized,
        });

        // 如果从未总结过（lastSummarized=0），不要自动跳过，保持为 0，等待用户触发
        // if (lastSummarized === 0 && currentFloor > 0) {
        //     this.log('info', '首次初始化，设置基准为当前楼层', { currentFloor });
        //     await this.setLastSummarizedFloor(currentFloor);
        // }    }
    }

    // ==================== 事件处理 ====================

    /**
     * 处理消息接收事件
     */
    private async handleMessageReceived(): Promise<void> {
        const currentFloor = this.getCurrentFloor();
        const lastSummarized = await this.getLastSummarizedFloor();
        const pendingFloors = currentFloor - lastSummarized;

        this.log('debug', '收到新消息', {
            currentFloor,
            lastSummarized,
            pendingFloors,
            triggerAt: this.config.floorInterval,
        });

        // 检查是否达到触发条件
        if (pendingFloors >= this.config.floorInterval) {
            this.log('info', '达到触发条件，准备总结', {
                pendingFloors,
                interval: this.config.floorInterval,
            });
            await this.triggerSummary();
        }
    }

    /**
     * 处理聊天切换事件
     */
    private handleChatChanged(): void {
        const newChatId = this.getCurrentChatId();

        this.log('info', '聊天已切换', {
            from: this.currentChatId,
            to: newChatId,
        });

        // 重新初始化
        this.initializeForCurrentChat();
    }

    // ==================== 总结逻辑 ====================

    /**
     * 手动/自动触发总结
     */
    async triggerSummary(manual = false): Promise<SummaryResult | null> {
        if (this.isSummarizing) {
            this.log('warn', '正在执行总结，跳过本次触发');
            return null;
        }

        if (!this.config.enabled && !manual) {
            this.log('debug', '自动总结已禁用');
            return null;
        }

        const currentFloor = this.getCurrentFloor();
        const lastSummarized = await this.getLastSummarizedFloor();

        this.isSummarizing = true;
        this.log('info', '开始执行总结', {
            floorRange: [lastSummarized + 1, currentFloor],
            manual,
        });

        try {
            // 2. 检查是否有新内容需要总结
            // 使用 bufferSize 来计算
            const startFloor = this._lastSummarizedFloor + 1;
            const buffer = this.config.bufferSize || 0;
            // 可处理的最大楼层 = 当前楼层 - 缓冲
            const maxProcessableFloor = currentFloor - buffer;

            // 如果连起始楼层都已经在缓冲期内，则跳过
            if (startFloor > maxProcessableFloor) {
                if (manual) {
                    notificationService.info('暂无足够的新内容需要总结 (缓冲期内)', 'Engram');
                }
                return null;
            }

            // 这里的 endFloor 是 Math.min(maxProcessableFloor, startFloor + interval - 1)
            const interval = this.config.floorInterval || 10;
            const proposedEndFloor = startFloor + interval - 1;
            const endFloor = Math.min(maxProcessableFloor, proposedEndFloor);

            // 范围校验
            if (startFloor > endFloor) {
                return null;
            }

            const floorRange: [number, number] = [startFloor, endFloor];
            this.log('info', '准备总结', { startFloor, endFloor, currentFloor, buffer });

            // 3. 准备 Prompt 上下文
            // 获取消息并切片 (注意：getChatMessages 返回的是 0-indexed 数组，对应楼层需要 -1)
            // 楼层 1 对应 index 0
            const messages = getChatMessages();
            // 在 JS 中 slice(start, end) 的 end 是 exclusive，但我们的 floors 是 inclusive
            // index start = startFloor - 1
            // index end = endFloor (因为 slice end 不包含，所以这里刚好取到 endFloor - 1 的元素)
            const slicedMessages = messages.slice(startFloor - 1, endFloor);

            this.log('info', '提取消息范围', {
                range: floorRange,
                msgCount: slicedMessages.length,
                firstMsg: (slicedMessages[0]?.mes || '').substring(0, 20)
            });

            if (slicedMessages.length === 0) {
                this.log('warn', '消息提取为空', { floorRange });
                return null;
            }

            const request: SummarizeRequest = {
                messages: slicedMessages.map(m => {
                    // 调试：如果 mes 为空，尝试查找其他属性
                    const content = m.mes || (m as any).content || (m as any).message || '';
                    if (!content) {
                        console.warn('[Engram] Message content is empty/undefined:', m);
                    }
                    return {
                        role: m.is_user ? 'user' : 'assistant',
                        content: content,
                        name: m.name
                    };
                }),
                floorRange: floorRange,
                templateId: this.config.promptTemplateId || undefined
            };

            // 1. 获取聊天记录并应用正则清洗
            // 用户要求：不要 A: xxx 格式，直接传清洗后的内容
            // 同时务必正确读取 mes 字段
            const rawChatHistory = slicedMessages.map(m => {
                const content = m.mes || (m as any).content || (m as any).message || '';
                return content;
            }).join('\n\n');
            const cleanedChatHistory = regexProcessor.process(rawChatHistory, 'input');
            this.log('debug', '应用正则清洗', {
                originalLength: rawChatHistory.length,
                cleanedLength: cleanedChatHistory.length,
            });

            // 2. 获取世界书内容（使用新方法）
            let worldbookContext = '';
            try {
                const worldInfo = await WorldInfoService.getActivatedWorldInfo();
                if (worldInfo) {
                    worldbookContext = '【背景设定】\n' + worldInfo + '\n\n';
                    this.log('debug', '已加载世界书内容', { length: worldInfo.length });
                }
            } catch (e) {
                this.log('warn', '获取世界书失败', { error: String(e) });
            }

            // 3. 获取提示词模板（优先从 APIPresets 获取）
            const template = SettingsManager.getEnabledPromptTemplate('text_summary');
            const systemPrompt = template?.systemPrompt || FALLBACK_SUMMARY_PROMPT.system;
            const userPromptTemplate = template?.userPromptTemplate || FALLBACK_SUMMARY_PROMPT.user;

            // 获取所有 Engram 摘要内容（用于精简功能）
            let engramSummaries = '';
            try {
                engramSummaries = await WorldInfoService.getEngramSummariesContent();
                if (engramSummaries) {
                    this.log('debug', '已加载 Engram 摘要', { length: engramSummaries.length });
                }
            } catch (e) {
                this.log('warn', '获取 Engram 摘要失败', { error: String(e) });
            }

            // 构建最终提示词
            const userPrompt = userPromptTemplate
                .replace('{{worldbookContext}}', worldbookContext)
                .replace('{{chatHistory}}', cleanedChatHistory)
                .replace('{{context}}', worldbookContext)  // 兼容两种变量名
                .replace('{{engramSummaries}}', engramSummaries);

            this.log('debug', '使用提示词模板', {
                source: template ? 'APIPresets' : 'fallback',
                templateName: template?.name || 'default'
            });

            // 4. 记录到模型日志并调用 LLM
            const logId = ModelLogger.logSend({
                type: 'summarize',
                systemPrompt,
                userPrompt,
                floorRange: request.floorRange,
                model: getCurrentModel(),
                character: getCurrentCharacter()?.name,
            });

            const startTime = Date.now();
            const response = await this.llmAdapter.generate({
                systemPrompt,
                userPrompt,
            });

            // 记录响应
            ModelLogger.logReceive(logId, {
                response: response.content,
                status: response.success ? 'success' : 'error',
                error: response.error,
                duration: Date.now() - startTime,
            });

            if (!response.success) {
                this.log('error', 'LLM 调用失败', { error: response.error });
                notificationService.error(`总结失败: ${response.error}`, 'Engram 错误');
                return null;
            }

            // 清洗输出：先用 textProcessor 基础清洗，再应用 output 规则移除 <think> 等
            const basicCleanedContent = this.textProcessor.clean(response.content);
            const cleanedContent = regexProcessor.process(basicCleanedContent, 'output');

            // 计算 Token
            const tokenCount = await WorldInfoService.countTokens(cleanedContent);

            // 创建结果
            const result: SummaryResult = {
                id: Date.now().toString(),
                content: cleanedContent,
                sourceFloors: request.floorRange,
                timestamp: Date.now(),
                tokenCount,
                writtenToWorldbook: false,
            };

            // 预览模式处理
            if (this.config.previewEnabled) {
                this.log('info', '预览模式：等待用户确认', { result });

                // 等待用户确认 (Promise)
                try {
                    const revisedContent = await revisionService.requestRevision(
                        '剧情摘要修订',
                        `范围: ${request.floorRange[0]} - ${request.floorRange[1]} 楼 | Token: ${tokenCount}`,
                        result.content
                    );

                    // 更新内容为用户修订后的版本
                    result.content = revisedContent;
                    // 重新计算 Token (虽然只是近似值，但很有必要)
                    result.tokenCount = await WorldInfoService.countTokens(revisedContent);

                    this.log('info', '用户确认并修订了摘要');
                } catch (e) {
                    this.log('warn', '用户取消了摘要写入');
                    notificationService.info('已取消写入世界书', '操作取消');
                    return null;
                }
            }

            // 写入世界书
            const writeSuccess = await this.writeToWorldbook(result);
            result.writtenToWorldbook = writeSuccess;

            // 更新状态 - 保存到 API 和缓存
            // 注意：这里我们只更新到 endFloor，而不是 currentFloor
            await this.setLastSummarizedFloor(request.floorRange[1]);
            this.summaryHistory.push(result);

            notificationService.success(`已总结 ${request.floorRange[0]}-${request.floorRange[1]} 楼`, 'Engram');

            // 自动隐藏逻辑
            if (this.config.autoHide) {
                // message range is 0-indexed, floor is 1-indexed.
                // startFloor=1 -> index=0
                const startIndex = request.floorRange[0] - 1;
                const endIndex = request.floorRange[1] - 1;
                this.log('info', '自动隐藏已总结楼层', { startIndex, endIndex });
                hideMessageRange(startIndex, endIndex).catch(e => {
                    this.log('error', '自动隐藏失败', e);
                });
            }

            return result;
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            this.log('error', '总结执行异常', { error: errorMsg });
            notificationService.error(`总结异常: ${errorMsg}`, 'Engram 错误');
            return null;
        } finally {
            this.isSummarizing = false;
        }
    }

    /**
     * 写入世界书
     */
    private async writeToWorldbook(result: SummaryResult): Promise<boolean> {
        try {
            const worldbookName = await WorldInfoService.getChatWorldbook();
            if (!worldbookName) {
                this.log('warn', '无法获取聊天世界书');
                return false;
            }

            // 1. 确保分隔符存在（只在首次写入时真正创建）
            await WorldInfoService.ensureSeparatorEntries(worldbookName);

            // 2. 获取下一个可用的顺序号 (9000+)
            const order = await WorldInfoService.getNextSummaryOrder(worldbookName);

            // 添加元数据注释 (水印)，不添加额外标题
            const metadataComment = `{{// ${JSON.stringify({
                floors: result.sourceFloors,
                tokens: result.tokenCount,
                timestamp: result.timestamp
            })} }}`;
            const finalContent = `${result.content}\n\n${metadataComment}`;

            const success = await WorldInfoService.createEntry(worldbookName, {
                name: `剧情摘要_${result.sourceFloors[0]}-${result.sourceFloors[1]}`,
                content: finalContent,
                keys: [SUMMARY_ENTRY_KEY],  // 添加关键词用于筛选
                enabled: true,  // 开启状态，让摘要能被激活进入上下文
                constant: true,
                order: order,   // 使用计算出的递增顺序
            });

            if (success) {
                this.log('success', '已写入世界书', { worldbook: worldbookName, order });

                // 更新总结次数统计
                const currentState = await WorldBookStateService.loadState(worldbookName);
                await WorldBookStateService.saveState(worldbookName, {
                    totalSummaries: currentState.totalSummaries + 1,
                });
            }

            return success;
        } catch (e) {
            this.log('error', '写入世界书失败', { error: String(e) });
            return false;
        }
    }

    // ==================== 状态查询 ====================

    /**
     * 获取当前状态
     */
    getStatus(): SummarizerStatus {
        const currentFloor = this.getCurrentFloor();
        // 使用同步缓存值
        const lastSummarized = this._lastSummarizedFloor;

        return {
            running: this.isRunning,
            currentFloor,
            lastSummarizedFloor: lastSummarized,
            pendingFloors: Math.max(0, currentFloor - lastSummarized),
            historyCount: this.summaryHistory.length,
            isSummarizing: this.isSummarizing,
        };
    }

    /**
     * 刷新状态（强制重新读取）
     */
    refreshStatus(): SummarizerStatus {
        // 触发异步刷新，但返回当前缓存
        this.initializeForCurrentChat();
        return this.getStatus();
    }

    /**
     * 获取配置
     */
    getConfig(): SummarizerConfig {
        return { ...this.config };
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<SummarizerConfig>): void {
        this.config = { ...this.config, ...config };
        // 持久化保存
        SettingsManager.set('summarizerConfig', this.config);
        this.log('debug', '配置已更新并保存', this.config);
    }

    /**
     * 获取总结历史
     */
    getHistory(): SummaryResult[] {
        return [...this.summaryHistory];
    }

    /**
     * 重置基准楼层为当前楼层
     */
    async resetBaseFloor(): Promise<void> {
        const currentFloor = this.getCurrentFloor();
        await this.setLastSummarizedFloor(currentFloor);
        this.log('info', '已重置基准楼层', { currentFloor });
    }

    // ==================== 工具方法 ====================

    /**
     * 记录日志
     */
    private async log(
        level: 'debug' | 'info' | 'success' | 'warn' | 'error',
        message: string,
        data?: unknown
    ): Promise<void> {
        try {
            const { Logger } = await import('@/lib/logger');
            Logger[level]('Summarizer', message, data);
        } catch {
            console.log(`[Summarizer] ${level}: ${message}`, data);
        }
    }
}

/** 默认实例 */
export const summarizerService = new SummarizerService();

export default SummarizerService;

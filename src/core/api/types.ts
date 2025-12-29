/**
 * Engram API 配置类型定义
 */

// ==================== LLM 预设 ====================

/**
 * LLM 预设配置
 */
export interface LLMPreset {
    /** 唯一标识 */
    id: string;
    /** 预设名称 */
    name: string;
    /** 配置源：使用酒馆当前配置、酒馆的 connection_profile 或自定义 */
    source: 'tavern' | 'tavern_profile' | 'custom';
    /** 选择的酒馆 connection_profile ID（仅当 source === 'tavern_profile' 时有效） */
    tavernProfileId?: string;
    /** 自定义 API 配置（仅当 source === 'custom' 时有效） */
    custom?: CustomAPIConfig;
    /** 模型采样参数 */
    parameters: SamplingParameters;
    /** 上下文设置 */
    context: ContextSettings;
    /** 是否为默认预设 */
    isDefault?: boolean;
    /** 创建时间 */
    createdAt: number;
    /** 更新时间 */
    updatedAt: number;
}


/**
 * 自定义 API 配置
 */
export interface CustomAPIConfig {
    /** API 端点 URL */
    apiUrl: string;
    /** API Key */
    apiKey: string;
    /** 模型名称 */
    model: string;
    /** API 类型/协议 */
    apiSource: APISource;
}

/**
 * 支持的 API 类型
 */
export type APISource = 'openai' | 'anthropic' | 'ollama' | 'vllm' | 'azure' | 'custom';

/**
 * 模型采样参数
 */
export interface SamplingParameters {
    /** 温度 (0-2) */
    temperature: number;
    /** Top-P 采样 (0-1) */
    topP: number;
    /** 最大输出 tokens */
    maxTokens: number;
    /** 频率惩罚 (-2 到 2) */
    frequencyPenalty: number;
    /** 存在惩罚 (-2 到 2) */
    presencePenalty: number;
}

/**
 * 上下文设置
 */
export interface ContextSettings {
    /** 使用多少条聊天历史 (-1 表示全部) */
    maxChatHistory: number;
}

// ==================== 向量化配置 ====================

/**
 * 向量化配置
 */
export interface VectorConfig {
    /** 向量源 */
    source: VectorSource;
    /** API 端点（部分源需要） */
    apiUrl?: string;
    /** API Key（部分源需要） */
    apiKey?: string;
    /** 模型名称 */
    model?: string;
    /** 向量维度 */
    dimensions?: number;
}

/**
 * 支持的向量源
 */
export type VectorSource =
    | 'transformers'  // 本地 transformers
    | 'openai'        // OpenAI Embeddings API
    | 'ollama'        // Ollama
    | 'vllm'          // vLLM
    | 'cohere'        // Cohere
    | 'jina'          // Jina AI
    | 'voyage';       // Voyage AI

// ==================== Rerank 配置 ====================

/**
 * Rerank 配置
 */
export interface RerankConfig {
    /** 是否启用 */
    enabled: boolean;
    /** API 端点 */
    url: string;
    /** API Key */
    apiKey: string;
    /** 模型名称 */
    model: string;
    /** 返回的结果数量 */
    topN: number;
    /** 混合评分权重 (0-1, 0=纯向量, 1=纯Rerank) */
    hybridAlpha: number;
}

// ==================== 提示词模板 ====================

/**
 * 提示词模板分类
 */
export type PromptCategory =
    | 'text_summary'      // 纯文本总结
    | 'vector_summary'    // 向量化总结
    | 'trim'              // 精简/修剪
    | 'query_enhance';    // 用户输入加强

/**
 * 提示词分类选项
 */
export const PROMPT_CATEGORIES: { value: PromptCategory; label: string; description: string }[] = [
    { value: 'text_summary', label: '纯文本总结', description: '将对话转为世界书条目' },
    { value: 'vector_summary', label: '向量化总结', description: '输出结构化 JSON，含实体/关系' },
    { value: 'trim', label: '精简/修剪', description: '合并、压缩旧的世界书条目' },
    { value: 'query_enhance', label: '用户输入加强', description: '扩展用户输入，解决指代问题' },
];

/**
 * 提示词模板
 */
export interface PromptTemplate {
    /** 唯一标识 */
    id: string;
    /** 模板名称 */
    name: string;
    /** 模板分类 */
    category: PromptCategory;
    /** 是否启用（每个分类可以有多个模板，但只有一个启用的会被使用） */
    enabled: boolean;
    /** 是否为内置模板（内置模板不可删除） */
    isBuiltIn: boolean;
    /** 绑定的 LLM 预设 ID，null 表示使用默认预设 */
    boundPresetId: string | null;
    /** 系统提示词 */
    systemPrompt: string;
    /** 用户提示词模板，支持变量 {{chatHistory}}, {{context}} 等 */
    userPromptTemplate: string;
    /** 输出格式 */
    outputFormat: 'json' | 'markdown' | 'plain';
    /** 可用变量列表 */
    availableVariables: string[];
    /** 创建时间 */
    createdAt: number;
    /** 更新时间 */
    updatedAt: number;
}

/**
 * 提示词模板导出格式（单个模板）
 */
export interface PromptTemplateSingleExport {
    version: string;
    exportedAt: number;
    template: Omit<PromptTemplate, 'id' | 'isBuiltIn' | 'enabled' | 'createdAt' | 'updatedAt'>;
}

/**
 * 提示词模板导出格式（批量）
 */
export interface PromptTemplateExport {
    version: string;
    exportedAt: number;
    templates: Omit<PromptTemplate, 'id' | 'isBuiltIn' | 'enabled' | 'createdAt' | 'updatedAt'>[];
}

// ==================== 世界书配置 ====================

/**
 * 世界书配置
 */
export interface WorldbookConfig {
    /** 是否启用世界书 */
    enabled: boolean;
    /** 是否包含全局世界书（false 则只读取角色世界书） */
    includeGlobal: boolean;
}

// ==================== 精简配置 ====================

/**
 * 精简触发器类型
 */
export type TrimTriggerType = 'token' | 'floor' | 'count';

/**
 * 精简配置（二层总结）
 */
export interface TrimConfig {
    /** 是否启用精简 */
    enabled: boolean;
    /** 触发器类型 */
    trigger: TrimTriggerType;
    /** Token 上限（trigger='token' 时使用） */
    tokenLimit: number;
    /** 楼层上限（trigger='floor' 时使用） */
    floorLimit: number;
    /** 总结次数上限（trigger='count' 时使用） */
    countLimit: number;
}

// ==================== 完整配置 ====================

/**
 * Engram API 配置（完整）
 */
export interface EngramAPISettings {
    /** LLM 预设列表 */
    llmPresets: LLMPreset[];
    /** 当前选中的 LLM 预设 ID（作为默认预设） */
    selectedPresetId: string | null;
    /** 向量化配置 */
    vectorConfig: VectorConfig;
    /** Rerank 配置 */
    rerankConfig: RerankConfig;
    /** 提示词模板列表 */
    promptTemplates: PromptTemplate[];
    /** 世界书配置 */
    worldbookConfig: WorldbookConfig;
    /** 精简配置（可选，二层总结） */
    trimConfig?: TrimConfig;
}

// ==================== 默认值 ====================

/**
 * 默认采样参数
 */
export const DEFAULT_SAMPLING_PARAMETERS: SamplingParameters = {
    temperature: 0.7,
    topP: 0.95,
    maxTokens: 2048,
    frequencyPenalty: 0,
    presencePenalty: 0,
};

/**
 * 默认上下文设置
 */
export const DEFAULT_CONTEXT_SETTINGS: ContextSettings = {
    maxChatHistory: 10,
};

/**
 * 默认向量化配置
 */
export const DEFAULT_VECTOR_CONFIG: VectorConfig = {
    source: 'transformers',
};

/**
 * 默认 Rerank 配置
 */
export const DEFAULT_RERANK_CONFIG: RerankConfig = {
    enabled: false,
    url: '',
    apiKey: '',
    model: '',
    topN: 5,
    hybridAlpha: 0.5,
};

/**
 * 创建默认 LLM 预设
 */
export function createDefaultLLMPreset(name: string = '默认预设'): LLMPreset {
    const now = Date.now();
    return {
        id: `preset_${now}`,
        name,
        source: 'tavern',
        parameters: { ...DEFAULT_SAMPLING_PARAMETERS },
        context: { ...DEFAULT_CONTEXT_SETTINGS },
        isDefault: true,
        createdAt: now,
        updatedAt: now,
    };
}

/**
 * 创建提示词模板
 */
export function createPromptTemplate(
    name: string,
    category: PromptCategory,
    options: Partial<Omit<PromptTemplate, 'id' | 'name' | 'category' | 'createdAt' | 'updatedAt'>> = {}
): PromptTemplate {
    const now = Date.now();
    return {
        id: `template_${now}_${Math.random().toString(36).slice(2, 8)}`,
        name,
        category,
        enabled: options.enabled ?? false,
        isBuiltIn: options.isBuiltIn ?? false,
        boundPresetId: options.boundPresetId ?? null,
        systemPrompt: options.systemPrompt ?? '',
        userPromptTemplate: options.userPromptTemplate ?? '',
        outputFormat: options.outputFormat ?? 'plain',
        availableVariables: options.availableVariables ?? ['{{chatHistory}}', '{{context}}', '{{char}}', '{{user}}'],
        createdAt: now,
        updatedAt: now,
    };
}

/**
 * 内置提示词模板
 */
export function getBuiltInPromptTemplates(): PromptTemplate[] {
    return [
        createPromptTemplate('纯文本剧情总结', 'text_summary', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: `<system_configuration>
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
            userPromptTemplate: `{{worldbookContext}}
请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请按要求输出剧情总结：`,
            outputFormat: 'plain',
        }),
        createPromptTemplate('向量化剧情总结', 'vector_summary', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个结构化信息提取助手。请从对话中提取关键信息，包括事件摘要、涉及的实体和它们之间的关系。',
            userPromptTemplate: '请从以下对话中提取结构化信息：\n\n{{chatHistory}}\n\n请以 JSON 格式输出，包含：\n- summary: 事件摘要\n- entities: 实体列表 [{name, type}]\n- relations: 关系列表 [{subject, predicate, object}]\n- keywords: 关键词列表',
            outputFormat: 'json',
        }),
        createPromptTemplate('记忆精简', 'trim', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个信息压缩助手。请将多条剧情摘要合并、精简为一条更简洁的摘要，保留最重要的信息。',
            userPromptTemplate: '请将以下多条剧情摘要合并精简：\n\n{{context}}\n\n请输出一条精简后的综合摘要。',
            outputFormat: 'markdown',
        }),
        createPromptTemplate('查询增强', 'query_enhance', {
            enabled: true,
            isBuiltIn: true,
            systemPrompt: '你是一个查询理解助手。请分析用户的输入，识别其中的指代词（如"那件事"、"他"等），并扩展为更明确的查询词。',
            userPromptTemplate: '用户输入：{{userInput}}\n\n最近对话上下文：\n{{context}}\n\n请输出扩展后的查询关键词列表，用于检索相关记忆。',
            outputFormat: 'plain',
        }),
    ];
}

/**
 * 默认世界书配置
 */
export const DEFAULT_WORLDBOOK_CONFIG: WorldbookConfig = {
    enabled: true,
    includeGlobal: true,
};

/**
 * 默认精简配置
 */
export const DEFAULT_TRIM_CONFIG: TrimConfig = {
    enabled: false,
    trigger: 'token',
    tokenLimit: 4096,
    floorLimit: 50,
    countLimit: 5,
};

/**
 * 获取默认 API 设置
 */
export function getDefaultAPISettings(): EngramAPISettings {
    return {
        llmPresets: [createDefaultLLMPreset()],
        selectedPresetId: null,
        vectorConfig: { ...DEFAULT_VECTOR_CONFIG },
        rerankConfig: { ...DEFAULT_RERANK_CONFIG },
        promptTemplates: getBuiltInPromptTemplates(),
        worldbookConfig: { ...DEFAULT_WORLDBOOK_CONFIG },
    };
}


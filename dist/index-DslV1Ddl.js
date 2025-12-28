var _ = Object.defineProperty;
var x = (o, t, e) => t in o ? _(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var n = (o, t, e) => x(o, typeof t != "symbol" ? t + "" : t, e);
import { E as y, T as h, M as F } from "./MessageService-DJA62e_j.js";
import { WorldInfoService as m } from "./WorldInfoService-CizlUCtc.js";
import { r as I, S as P, M } from "./index-BvcZWTGb.js";
import { D as J, R as Q } from "./index-BvcZWTGb.js";
const $ = [
  // 移除多余空行
  { pattern: /\n{3,}/g, replacement: `

`, description: "多余空行" },
  // 移除行首行尾空白
  { pattern: /^[ \t]+|[ \t]+$/gm, replacement: "", description: "行首尾空白" },
  // 移除 Markdown 代码块标记（保留内容）
  { pattern: /```\w*\n?/g, replacement: "", description: "Markdown代码块" },
  // 统一中文引号
  { pattern: /[""]/g, replacement: '"', description: "中文引号" },
  { pattern: /['']/g, replacement: "'", description: "中文单引号" },
  // 移除常见的 LLM 前缀
  { pattern: /^(好的|以下是|这是|根据对话).{0,20}[:：]\s*/gm, replacement: "", description: "LLM前缀" },
  // 移除末尾的解释性文字
  { pattern: /\n*如果.{0,50}请.{0,30}[。！]?\s*$/g, replacement: "", description: "末尾解释" }
];
class D {
  constructor(t) {
    n(this, "rules");
    this.rules = t || $;
  }
  /**
   * 清洗 LLM 输出文本
   * @param text 原始文本
   * @returns 清洗后的文本
   */
  clean(t) {
    let e = t;
    for (const r of this.rules)
      e = e.replace(r.pattern, r.replacement);
    return e.trim();
  }
  /**
   * 格式化为世界书条目格式
   * @param summary 总结内容
   * @param metadata 元数据
   */
  formatAsWorldEntry(t, e) {
    new Date(e.timestamp).toLocaleDateString("zh-CN");
    let a = `📜 剧情摘要 [楼层${`${e.floorRange[0]}-${e.floorRange[1]}`}]
`;
    return a += t, a;
  }
  /**
   * 提取纯文本（移除所有格式标记）
   * @param text 原始文本
   */
  extractPlainText(t) {
    return t.replace(/```[\s\S]*?```/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_~`#]/g, "").replace(/\n{2,}/g, `
`).trim();
  }
  /**
   * 截断文本到指定长度
   * @param text 文本
   * @param maxLength 最大长度
   * @param suffix 截断后缀
   */
  truncate(t, e, r = "...") {
    return t.length <= e ? t : t.slice(0, e - r.length) + r;
  }
  /**
   * 添加自定义规则
   */
  addRule(t) {
    this.rules.push(t);
  }
  /**
   * 获取当前规则列表
   */
  getRules() {
    return [...this.rules];
  }
}
const k = new D();
function E() {
  try {
    return window.TavernHelper || null;
  } catch {
    return null;
  }
}
class H {
  /**
   * 调用 LLM 生成
   * @param request 请求参数
   */
  async generate(t) {
    const e = E();
    if (!(e != null && e.generateRaw) && !(e != null && e.generate))
      return {
        success: !1,
        content: "",
        error: "TavernHelper 不可用"
      };
    try {
      let r;
      if (e.generateRaw)
        r = await e.generateRaw({
          ordered_prompts: [
            { role: "system", content: t.systemPrompt },
            { role: "user", content: t.userPrompt }
          ]
          // 如果指定了预设 ID，可以在这里配置
          // custom_api: request.presetId ? await this.getPresetConfig(request.presetId) : undefined,
        });
      else if (e.generate)
        r = await e.generate({
          user_input: t.userPrompt,
          system_prompt: t.systemPrompt,
          should_stream: !1,
          max_chat_history: 0
        });
      else
        throw new Error("无可用的生成 API");
      return {
        success: !0,
        content: r || ""
      };
    } catch (r) {
      const s = r instanceof Error ? r.message : String(r);
      return console.error("[Engram] LLMAdapter 调用失败:", r), {
        success: !1,
        content: "",
        error: s
      };
    }
  }
  /**
   * 检查 LLM API 是否可用
   */
  isAvailable() {
    const t = E();
    return !!(t != null && t.generate || t != null && t.generateRaw);
  }
  /**
   * 估算文本 Token 数（简单估算）
   * @param text 文本
   */
  estimateTokens(t) {
    return Math.ceil(t.length / 3);
  }
}
const N = new H(), W = {
  enabled: !0,
  triggerMode: "auto",
  floorInterval: 10,
  worldbookMode: "chat",
  previewEnabled: !0,
  promptTemplateId: null,
  // 使用内置默认模板
  llmPresetId: null
  // 使用默认预设
}, R = {
  system: `你是一个专业的剧情总结助手。你的任务是将对话内容提炼为简洁的剧情摘要。

要求：
1. 保留关键情节和转折点
2. 提取重要的角色互动和情感变化
3. 使用第三人称叙述
4. 保持简洁，避免冗余
5. 直接输出摘要内容，不要添加前缀或解释`,
  user: `{{worldbookContext}}请将以下对话内容总结为剧情摘要：

{{chatHistory}}

---
请输出简洁的剧情摘要：`
}, g = "engram";
function T() {
  var o, t;
  try {
    return ((t = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : t.call(o)) || null;
  } catch {
    return null;
  }
}
function z() {
  var o, t;
  try {
    const e = (t = (o = window.SillyTavern) == null ? void 0 : o.getContext) == null ? void 0 : t.call(o);
    return e != null && e.chat_metadata ? e.chat_metadata : window.chat_metadata || null;
  } catch {
    return null;
  }
}
function U() {
  var o;
  try {
    (o = window.saveChatDebounced) == null || o.call(window);
  } catch {
    console.warn("[Engram] saveChatDebounced 不可用");
  }
}
class G {
  constructor(t, e, r) {
    n(this, "config");
    n(this, "textProcessor");
    n(this, "llmAdapter");
    n(this, "currentChatId", null);
    n(this, "isRunning", !1);
    n(this, "isSummarizing", !1);
    n(this, "unsubscribeMessage", null);
    n(this, "unsubscribeChat", null);
    n(this, "summaryHistory", []);
    this.config = { ...W, ...t }, this.textProcessor = e || k, this.llmAdapter = r || N;
  }
  // ==================== 元数据操作 ====================
  /**
   * 从当前聊天元数据获取值
   */
  getFromChatMetadata(t) {
    const e = z();
    if (!e) {
      this.log("warn", "chat_metadata 不可用");
      return;
    }
    return e.extensions || (e.extensions = {}), e.extensions[g] || (e.extensions[g] = {}), e.extensions[g][t];
  }
  /**
   * 保存值到当前聊天元数据
   */
  saveToChatMetadata(t, e) {
    const r = z();
    if (!r) {
      this.log("warn", "chat_metadata 不可用，无法保存");
      return;
    }
    r.extensions || (r.extensions = {}), r.extensions[g] || (r.extensions[g] = {}), r.extensions[g][t] = e, this.log("debug", `已保存到 chat_metadata: ${t} = ${e}`), U();
  }
  /**
   * 获取上次总结的楼层（从聊天元数据）
   */
  getLastSummarizedFloor() {
    const t = this.getFromChatMetadata("lastSummarizedFloor");
    return typeof t == "number" ? t : 0;
  }
  /**
   * 设置上次总结的楼层（保存到聊天元数据）
   */
  setLastSummarizedFloor(t) {
    this.saveToChatMetadata("lastSummarizedFloor", t);
  }
  // ==================== 楼层计算 ====================
  /**
   * 获取当前真实楼层数
   */
  getCurrentFloor() {
    const t = T();
    return t != null && t.chat ? t.chat.length : 0;
  }
  /**
   * 获取当前聊天 ID
   */
  getCurrentChatId() {
    const t = T();
    return (t == null ? void 0 : t.chatId) || null;
  }
  // ==================== 生命周期 ====================
  /**
   * 启动服务，开始监听事件
   */
  start() {
    if (this.isRunning) {
      this.log("warn", "服务已在运行");
      return;
    }
    this.initializeForCurrentChat(), this.config.triggerMode === "auto" && (this.unsubscribeMessage = y.on(
      h.MESSAGE_RECEIVED,
      this.handleMessageReceived.bind(this)
    ), this.log("debug", `已订阅事件: ${h.MESSAGE_RECEIVED}`)), this.unsubscribeChat = y.on(
      h.CHAT_CHANGED,
      this.handleChatChanged.bind(this)
    ), this.log("debug", `已订阅事件: ${h.CHAT_CHANGED}`), this.isRunning = !0;
    const t = this.getStatus();
    this.log("info", "服务已启动", t);
  }
  /**
   * 停止服务
   */
  stop() {
    this.unsubscribeMessage && (this.unsubscribeMessage(), this.unsubscribeMessage = null), this.unsubscribeChat && (this.unsubscribeChat(), this.unsubscribeChat = null), this.isRunning = !1, this.log("info", "服务已停止");
  }
  /**
   * 为当前聊天初始化状态
   */
  initializeForCurrentChat() {
    const t = this.getCurrentChatId(), e = this.getCurrentFloor(), r = this.getLastSummarizedFloor();
    this.currentChatId = t, this.log("info", "初始化当前聊天状态", {
      chatId: t,
      currentFloor: e,
      lastSummarizedFloor: r,
      pendingFloors: e - r
    }), r === 0 && e > 0 && (this.log("info", "首次初始化，设置基准为当前楼层", { currentFloor: e }), this.setLastSummarizedFloor(e));
  }
  // ==================== 事件处理 ====================
  /**
   * 处理消息接收事件
   */
  async handleMessageReceived() {
    const t = this.getCurrentFloor(), e = this.getLastSummarizedFloor(), r = t - e;
    this.log("debug", "收到新消息", {
      currentFloor: t,
      lastSummarized: e,
      pendingFloors: r,
      triggerAt: this.config.floorInterval
    }), r >= this.config.floorInterval && (this.log("info", "达到触发条件，准备总结", {
      pendingFloors: r,
      interval: this.config.floorInterval
    }), await this.triggerSummary());
  }
  /**
   * 处理聊天切换事件
   */
  handleChatChanged() {
    const t = this.getCurrentChatId();
    this.log("info", "聊天已切换", {
      from: this.currentChatId,
      to: t
    }), this.initializeForCurrentChat();
  }
  // ==================== 总结逻辑 ====================
  /**
   * 手动/自动触发总结
   */
  async triggerSummary(t = !1) {
    if (this.isSummarizing)
      return this.log("warn", "正在执行总结，跳过本次触发"), null;
    if (!this.config.enabled && !t)
      return this.log("debug", "自动总结已禁用"), null;
    const e = this.getCurrentFloor(), r = this.getLastSummarizedFloor();
    this.isSummarizing = !0, this.log("info", "开始执行总结", {
      floorRange: [r + 1, e],
      manual: t
    });
    try {
      const s = F.getMessages(r, e);
      if (s.length === 0)
        return this.log("warn", "没有待总结的消息"), null;
      const a = {
        messages: s.map((l) => ({
          role: l.role,
          content: l.content,
          name: l.name
        })),
        floorRange: [r + 1, e]
      }, f = F.formatMessagesAsText(s), p = I.process(f);
      this.log("debug", "应用正则清洗", {
        originalLength: f.length,
        cleanedLength: p.length
      });
      let d = "";
      try {
        const l = await m.getActivatedWorldInfo();
        l && (d = `【背景设定】
` + l + `

`, this.log("debug", "已加载世界书内容", { length: l.length }));
      } catch (l) {
        this.log("warn", "获取世界书失败", { error: String(l) });
      }
      const i = P.getEnabledPromptTemplate("text_summary"), w = (i == null ? void 0 : i.systemPrompt) || R.system, C = ((i == null ? void 0 : i.userPromptTemplate) || R.user).replace("{{worldbookContext}}", d).replace("{{chatHistory}}", p).replace("{{context}}", d);
      this.log("debug", "使用提示词模板", {
        source: i ? "APIPresets" : "fallback",
        templateName: (i == null ? void 0 : i.name) || "default"
      });
      const A = M.logSend({
        type: "summarize",
        systemPrompt: w,
        userPrompt: C,
        floorRange: a.floorRange
      }), v = Date.now(), c = await this.llmAdapter.generate({
        systemPrompt: w,
        userPrompt: C
      });
      if (M.logReceive(A, {
        response: c.content,
        status: c.success ? "success" : "error",
        error: c.error,
        duration: Date.now() - v
      }), !c.success)
        return this.log("error", "LLM 调用失败", { error: c.error }), this.showNotification("error", `总结失败: ${c.error}`), null;
      const S = this.textProcessor.clean(c.content), b = await m.countTokens(S), u = {
        content: S,
        tokenCount: b,
        sourceFloors: a.floorRange,
        timestamp: Date.now(),
        writtenToWorldbook: !1
      };
      this.config.previewEnabled && this.log("info", "预览模式：等待用户确认", { result: u });
      const L = await this.writeToWorldbook(u);
      return u.writtenToWorldbook = L, this.setLastSummarizedFloor(e), this.summaryHistory.push(u), this.log("success", "总结完成", {
        tokens: b,
        floorRange: u.sourceFloors,
        newLastSummarized: e
      }), u;
    } catch (s) {
      const a = s instanceof Error ? s.message : String(s);
      return this.log("error", "总结执行异常", { error: a }), this.showNotification("error", `总结异常: ${a}`), null;
    } finally {
      this.isSummarizing = !1;
    }
  }
  /**
   * 写入世界书
   */
  async writeToWorldbook(t) {
    try {
      const e = await m.getChatWorldbook();
      if (!e)
        return this.log("warn", "无法获取聊天世界书"), !1;
      const r = this.textProcessor.formatAsWorldEntry(
        t.content,
        {
          floorRange: t.sourceFloors,
          timestamp: t.timestamp
        }
      ), s = await m.createEntry(e, {
        name: `剧情摘要_${t.sourceFloors[0]}-${t.sourceFloors[1]}`,
        content: r,
        enabled: !0,
        constant: !0
      });
      return s && this.log("success", "已写入世界书", { worldbook: e }), s;
    } catch (e) {
      return this.log("error", "写入世界书失败", { error: String(e) }), !1;
    }
  }
  // ==================== 状态查询 ====================
  /**
   * 获取当前状态
   */
  getStatus() {
    const t = this.getCurrentFloor(), e = this.getLastSummarizedFloor();
    return {
      running: this.isRunning,
      currentFloor: t,
      lastSummarizedFloor: e,
      pendingFloors: Math.max(0, t - e),
      historyCount: this.summaryHistory.length,
      isSummarizing: this.isSummarizing
    };
  }
  /**
   * 刷新状态（强制重新读取）
   */
  refreshStatus() {
    return this.initializeForCurrentChat(), this.getStatus();
  }
  /**
   * 获取配置
   */
  getConfig() {
    return { ...this.config };
  }
  /**
   * 更新配置
   */
  updateConfig(t) {
    this.config = { ...this.config, ...t }, this.log("info", "配置已更新", { config: this.config });
  }
  /**
   * 获取总结历史
   */
  getHistory() {
    return [...this.summaryHistory];
  }
  /**
   * 重置基准楼层为当前楼层
   */
  resetBaseFloor() {
    const t = this.getCurrentFloor();
    this.setLastSummarizedFloor(t), this.log("info", "已重置基准楼层", { currentFloor: t });
  }
  // ==================== 工具方法 ====================
  /**
   * 记录日志
   */
  async log(t, e, r) {
    try {
      const { Logger: s } = await import("./index-BvcZWTGb.js").then((a) => a.b);
      s[t]("Summarizer", e, r);
    } catch {
      console.log(`[Summarizer] ${t}: ${e}`, r);
    }
  }
  /**
   * 显示通知
   */
  showNotification(t, e) {
    try {
      const r = window.toastr;
      r != null && r[t] && r[t](e, "Engram");
    } catch {
      console.log(`[Engram Notification] ${t}: ${e}`);
    }
  }
}
const X = new G();
export {
  J as DEFAULT_REGEX_RULES,
  W as DEFAULT_SUMMARIZER_CONFIG,
  H as LLMAdapter,
  Q as RegexProcessor,
  G as SummarizerService,
  D as TextProcessor,
  N as llmAdapter,
  I as regexProcessor,
  X as summarizerService,
  k as textProcessor
};
//# sourceMappingURL=index-DslV1Ddl.js.map

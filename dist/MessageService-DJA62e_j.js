var u = Object.defineProperty;
var g = (r, e, t) => e in r ? u(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var l = (r, e, t) => g(r, typeof e != "symbol" ? e + "" : e, t);
import { g as c, i as f } from "./index-BvcZWTGb.js";
const h = {
  MESSAGE_RECEIVED: "message_received",
  // 聊天事件
  CHAT_CHANGED: "chat_id_changed"
};
function i() {
  try {
    const r = window.SillyTavern;
    if (r != null && r.getContext) {
      const e = r.getContext();
      return (e == null ? void 0 : e.eventSource) || null;
    }
    return null;
  } catch {
    return console.warn("[Engram] EventBus: 无法获取 SillyTavern eventSource"), null;
  }
}
class o {
  /**
   * 订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   * @returns 取消订阅函数
   */
  static on(e, t) {
    const s = i();
    return s && s.on(e, t), this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t), () => {
      this.off(e, t);
    };
  }
  /**
   * 一次性订阅事件（触发后自动取消）
   * @param event 事件名称
   * @param callback 回调函数
   */
  static once(e, t) {
    const s = i();
    if (s)
      s.once(e, t);
    else {
      const n = (...a) => {
        this.off(e, n), t(...a);
      };
      this.on(e, n);
    }
  }
  /**
   * 取消订阅事件
   * @param event 事件名称
   * @param callback 回调函数
   */
  static off(e, t) {
    var n;
    const s = i();
    s && s.removeListener(e, t), (n = this.listeners.get(e)) == null || n.delete(t);
  }
  /**
   * 清除所有已注册的监听器
   * 在扩展卸载时调用
   */
  static clearAll() {
    const e = i();
    for (const [t, s] of this.listeners)
      for (const n of s)
        e && e.removeListener(t, n);
    this.listeners.clear();
  }
  /**
   * 检查 EventBus 是否可用
   */
  static isAvailable() {
    return i() !== null;
  }
}
l(o, "listeners", /* @__PURE__ */ new Map());
const M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventBus: o,
  TavernEventType: h
}, Symbol.toStringTag, { value: "Module" }));
function d(r, e) {
  let t = "assistant";
  return r.is_user ? t = "user" : r.is_system && (t = "system"), {
    id: e,
    role: t,
    content: r.mes || "",
    name: r.name || "",
    isHidden: r.is_hidden ?? !1,
    raw: r
  };
}
class m {
  /**
   * 获取当前聊天的所有消息
   * @param options 查询选项
   */
  static getAllMessages(e = {}) {
    const t = c();
    if (!(t != null && t.chat))
      return [];
    let s = t.chat.map((n, a) => d(n, a));
    if (e.includeHidden || (s = s.filter((n) => !n.isHidden)), e.role) {
      const n = Array.isArray(e.role) ? e.role : [e.role];
      s = s.filter((a) => n.includes(a.role));
    }
    return s;
  }
  /**
   * 获取最近 N 条消息
   * @param count 消息数量
   * @param options 查询选项
   */
  static getRecentMessages(e, t = {}) {
    return this.getAllMessages(t).slice(-e);
  }
  /**
   * 获取指定范围的消息
   * @param start 起始索引（包含）
   * @param end 结束索引（不包含）
   * @param options 查询选项
   */
  static getMessages(e, t, s = {}) {
    return this.getAllMessages(s).slice(e, t);
  }
  /**
   * 获取当前楼层数（消息总数）
   * @param options 查询选项
   */
  static getFloorCount(e = {}) {
    return this.getAllMessages(e).length;
  }
  /**
   * 获取最后一条消息
   * @param options 查询选项
   */
  static getLastMessage(e = {}) {
    const t = this.getAllMessages(e);
    return t.length > 0 ? t[t.length - 1] : null;
  }
  /**
   * 获取当前角色名称
   */
  static getCurrentCharacterName() {
    var t;
    const e = c();
    return !(e != null && e.characters) || e.characterId < 0 ? null : ((t = e.characters[e.characterId]) == null ? void 0 : t.name) || null;
  }
  /**
   * 格式化消息为纯文本（用于传给 LLM）
   * @param messages 消息数组
   * @param format 格式化模板
   */
  static formatMessagesAsText(e, t = "simple") {
    return t === "simple" ? e.map((s) => `${s.name}: ${s.content}`).join(`

`) : e.map((s) => `[${s.role.toUpperCase()}] ${s.name}:
${s.content}`).join(`

---

`);
  }
  /**
   * 检查 MessageService 是否可用
   */
  static isAvailable() {
    return f();
  }
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MessageService: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  o as E,
  m as M,
  h as T,
  M as a,
  _ as b
};
//# sourceMappingURL=MessageService-DJA62e_j.js.map

# SillyTavern 事件总线与 Engram 召回系统调研

> 调研目标：分析 swipe/reroll/删除后重新生成场景下召回失效的原因，提出改进方案

## 核心发现

### 问题根源

**`Injector.ts` 第 95-98 行故意跳过了 swipe/reroll**：

```typescript
// 只处理正常生成，跳过 regenerate、swipe、quiet 等
if (type === 'regenerate' || type === 'swipe' || type === 'quiet' || type === 'impersonate') {
    Logger.debug('Injector', `跳过 ${type} 类型生成`);
    return;
}
```

这意味着：
- ❌ **重新生成 (Regenerate)** - 召回不执行
- ❌ **切换回复 (Swipe)** - 召回不执行  
- ❌ **静默生成 (Quiet)** - 召回不执行
- ❌ **扮演 (Impersonate)** - 召回不执行
- ✅ 只有**首次正常生成**时召回才执行

---

## 酒馆事件系统

### 事件源

```javascript
// /public/scripts/events.js
import { EventEmitter } from '../lib/eventemitter.js';
export const eventSource = new EventEmitter([event_types.APP_READY]);
```

### 关键事件清单

| 事件 | 触发时机 | 参数 |
|------|----------|------|
| `GENERATION_AFTER_COMMANDS` | 命令处理完后、生成开始前 | `(type, params, dryRun)` |
| `GENERATION_STARTED` | 生成开始 | 无 |
| `GENERATION_ENDED` | 生成结束 | 无 |
| `MESSAGE_SENT` | 用户消息发送后 | 消息索引 |
| `MESSAGE_RECEIVED` | AI 回复完成后 | 消息索引 |
| `MESSAGE_SWIPED` | 切换回复后 | 消息索引 |
| `MESSAGE_UPDATED` | 消息内容更新 | 消息索引 |
| `MESSAGE_DELETED` | 消息被删除 | 消息索引 |

### 生成类型 (type 参数)

根据酒馆源码分析，`GENERATION_AFTER_COMMANDS` 的 `type` 参数可能值：

| type | 场景 |
|------|------|
| `normal` | 正常首次生成 |
| `regenerate` | 点击重新生成按钮 |
| `swipe` | 左右切换回复 |
| `quiet` | 静默生成（后台） |
| `impersonate` | 用户扮演角色 |
| `continue` | 继续生成 |

---

## 当前 Engram 事件监听

### Injector.ts

```typescript
// 监听生成命令处理完成事件
EventBus.on(TavernEventType.GENERATION_AFTER_COMMANDS, async (type, params, dryRun) => {
    // 当前逻辑：跳过 regenerate/swipe/quiet/impersonate
});

// 监听聊天切换
EventBus.on(TavernEventType.CHAT_CHANGED, () => { ... });
```

### EventWatcher.ts

```typescript
EventBus.on(TavernEventType.MESSAGE_RECEIVED, ...);
EventBus.on(TavernEventType.CHAT_CHANGED, ...);
EventBus.on(TavernEventType.GENERATION_STARTED, ...);
EventBus.on(TavernEventType.GENERATION_ENDED, ...);
```

---

## 为什么要跳过 regenerate/swipe？

原设计理由（推测）：
1. **避免重复注入**：regenerate 时用户消息未变，不需要重新预处理
2. **性能考虑**：每次 swipe 都召回会造成延迟
3. **用户体验**：swipe 是快速切换，不应被阻塞

**但这带来的问题**：
1. 用户修改消息后 regenerate，召回使用的仍是旧结果
2. 首次生成失败后 swipe，召回结果丢失
3. 删除消息后重新生成，召回可能失效

---

## 改进方案

### 方案 A：智能判断是否需要重新召回

```typescript
if (type === 'regenerate' || type === 'swipe') {
    // 检查用户消息是否发生变化
    const lastUserMsg = getLastUserMessage();
    const cachedMsg = this.lastProcessedMessage;
    
    if (lastUserMsg === cachedMsg) {
        // 消息未变，使用缓存的召回结果
        return;
    }
    // 消息已变，重新执行召回
}
```

### 方案 B：缓存召回结果，按需刷新

1. 召回结果带时间戳缓存
2. regenerate/swipe 时检查缓存有效性
3. 用户消息变化时自动失效

### 方案 C：监听 MESSAGE_UPDATED 事件

```typescript
EventBus.on(TavernEventType.MESSAGE_UPDATED, (msgIndex) => {
    // 如果是用户消息被编辑，标记召回缓存为失效
    markRecallCacheInvalid();
});
```

---

## 酒馆 Regenerate 流程分析

```
用户点击 Regenerate
    ↓
删除最后一条 AI 消息
    ↓
触发 MESSAGE_DELETED
    ↓
触发 GENERATION_AFTER_COMMANDS (type='regenerate')
    ↓
Engram Injector 跳过 ← 问题所在
    ↓
酒馆继续生成（无 RAG 注入）
```

---

## 建议优先级

1. **P0**：移除对 `regenerate` 的跳过，用户消息未变时使用缓存
2. **P1**：监听 `MESSAGE_UPDATED` 实现缓存失效
3. **P2**：考虑 `swipe` 场景是否需要召回（可配置）

---

## 参考资料

- 酒馆事件定义：[events.js](file:///Users/macbookair/SillyTavern/public/scripts/events.js)
- Engram 事件封装：[TavernEvents.ts](file:///Users/macbookair/SillyTavern/public/scripts/extensions/Engram_project/src/tavern/TavernEvents.ts)
- Injector 实现：[Injector.ts](file:///Users/macbookair/SillyTavern/public/scripts/extensions/Engram_project/src/services/rag/Injector.ts)

---

## 缓存机制分析（黏性系统）

### 回答：reroll 时缓存会保留吗？

**部分保留**：

| 组件 | 缓存内容 | reroll 时状态 |
|------|----------|--------------|
| `StickyCache` | 召回历史（eventId + 轮次） | ✅ 保留 |
| `MacroService.cachedSummaries` | 召回结果文本 | ⚠️ 保留但可能过期 |
| `{{engramSummaries}}` 宏 | 指向 cachedSummaries | ⚠️ 使用旧数据 |

### StickyCache 的作用

```
StickyCache 不缓存召回结果本身！
它只记录：哪些 eventId 在哪一轮被召回过，用于计算惩罚分数
```

```typescript
interface StickyCacheEntry {
    lastRound: number;       // 上次召回的轮次
    consecutiveCount: number; // 连续召回次数
}
```

### MacroService 缓存

```typescript
// 宏替换是同步的，所以使用预先计算的缓存
context.registerMacro('engramSummaries', () => {
    return MacroService.cachedSummaries;  // ← 这个缓存只在 Injector 触发时刷新
});
```

### 问题场景

```
首次生成：
  1. Injector 触发
  2. 执行召回
  3. MacroService.cachedSummaries = 召回结果
  4. {{engramSummaries}} 返回正确内容

Reroll 时：
  1. Injector 跳过 (type='regenerate')
  2. 召回未执行
  3. cachedSummaries 仍是旧值
  4. {{engramSummaries}} 返回旧内容 ← 可能是正确的！
```

**结论**：如果用户消息没变，缓存的结果其实是正确的。问题在于用户**修改了消息后**再 reroll，此时应该重新召回但没有。

---

## 需要修复的场景

| 场景 | 当前行为 | 期望行为 |
|------|----------|----------|
| 消息未变 + reroll | 使用缓存 ✅ | 使用缓存 ✅ |
| 消息已变 + reroll | 使用缓存 ❌ | 重新召回 ✅ |
| swipe | 使用缓存 ⚠️ | 可配置 |
| 删除消息后重新生成 | 可能用错误缓存 ❌ | 重新召回 ✅ |

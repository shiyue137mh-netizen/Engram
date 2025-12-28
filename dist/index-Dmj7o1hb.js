import { E as v, M as l, T as c } from "./MessageService-DJA62e_j.js";
import { WorldInfoService as f } from "./WorldInfoService-CizlUCtc.js";
async function o() {
  const { EventBus: n } = await import("./MessageService-DJA62e_j.js").then((a) => a.a), { MessageService: e } = await import("./MessageService-DJA62e_j.js").then((a) => a.b), { WorldInfoService: t } = await import("./WorldInfoService-CizlUCtc.js");
  return {
    eventBus: n.isAvailable(),
    messageService: e.isAvailable(),
    worldInfoService: t.isAvailable(),
    nativeTokenCount: await t.isNativeTokenCountAvailable(),
    floorCount: e.isAvailable() ? e.getFloorCount() : null,
    characterName: e.isAvailable() ? e.getCurrentCharacterName() : null
  };
}
export {
  v as EventBus,
  l as MessageService,
  c as TavernEventType,
  f as WorldInfoService,
  o as checkTavernIntegration
};
//# sourceMappingURL=index-Dmj7o1hb.js.map

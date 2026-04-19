interface Window {
  /**
   * 酒馆助手提供的额外功能, 具体内容见于 https://n0vi028.github.io/JS-Slash-Runner-Doc
   * 你也可以在酒馆页面按 f12, 在控制台中输入 `window.TavernHelper` 来查看当前酒馆助手所提供的接口
   */
  TavernHelper: {
    // Audio
    readonly playAudio: typeof playAudio;
    readonly pauseAudio: typeof pauseAudio;
    readonly getAudioList: typeof getAudioList;
    readonly replaceAudioList: typeof replaceAudioList;
    readonly insertAudioList: typeof insertAudioList;
    readonly getAudioSettings: typeof getAudioSettings;
    readonly setAudioSettings: typeof setAudioSettings;

    // Builtin
    readonly builtin: typeof builtin;

    // Character
    readonly Character: typeof Character;

    // Chat_message
    readonly getChatMessages: typeof getChatMessages;
    readonly setChatMessages: typeof setChatMessages;
    readonly createChatMessages: typeof createChatMessages;
    readonly deleteChatMessages: typeof deleteChatMessages;
    readonly rotateChatMessages: typeof rotateChatMessages;

    // Displayed_message
    readonly formatAsDisplayedMessage: typeof formatAsDisplayedMessage;
    readonly retrieveDisplayedMessage: typeof retrieveDisplayedMessage;

    // Extension
    readonly isAdmin: typeof isAdmin;
    readonly getExtensionType: typeof getExtensionType;
    readonly getExtensionStatus: typeof getExtensionInstallationInfo;
    readonly isInstalledExtension: typeof isInstalledExtension;
    readonly installExtension: typeof installExtension;
    readonly uninstallExtension: typeof uninstallExtension;
    readonly reinstallExtension: typeof reinstallExtension;
    readonly updateExtension: typeof updateExtension;

    // Generate
    readonly builtin_prompt_default_order: typeof builtin_prompt_default_order;
    readonly generate: typeof generate;
    readonly generateRaw: typeof generateRaw;

    // Global
    readonly initializeGlobal: typeof initializeGlobal;
    readonly waitGlobalInitialized: typeof waitGlobalInitialized;

    // Import_raw
    readonly importRawCharacter: typeof importRawCharacter;
    readonly importRawChat: typeof importRawChat;
    readonly importRawPreset: typeof importRawPreset;
    readonly importRawWorldbook: typeof importRawWorldbook;
    readonly importRawTavernRegex: typeof importRawTavernRegex;

    // Inject
    readonly injectPrompts: typeof injectPrompts;
    readonly uninjectPrompts: typeof uninjectPrompts;

    // Lorebook_entry
    readonly getLorebookEntries: typeof getLorebookEntries;
    readonly replaceLorebookEntries: typeof replaceLorebookEntries;
    readonly updatelorebookEntriesWith: typeof updateLorebookEntriesWith;
    readonly setLorebookEntries: typeof setLorebookEntries;
    readonly createLorebookEntries: typeof createLorebookEntries;
    readonly deleteLorebookEntries: typeof deleteLorebookEntries;

    // Lorebook
    readonly getLorebookSettings: typeof getLorebookSettings;
    readonly setLorebookSettings: typeof setLorebookSettings;
    readonly getLorebooks: typeof getLorebooks;
    readonly deleteLorebook: typeof deleteLorebook;
    readonly createLorebook: typeof createLorebook;
    readonly getCharLorebooks: typeof getCharLorebooks;
    readonly setCurrentCharLorebooks: typeof setCurrentCharLorebooks;
    readonly getCurrentCharPrimaryLorebook: typeof getCurrentCharPrimaryLorebook;
    readonly getOrCreateChatLorebook: typeof getOrCreateChatLorebook;

    // Macrolike
    readonly registerMacroLike: typeof registerMacroLike;

    // Preset
    readonly isPresetNormalPrompt: typeof isPresetNormalPrompt;
    readonly isPresetSystemPrompt: typeof isPresetSystemPrompt;
    readonly isPresetPlaceholderPrompt: typeof isPresetPlaceholderPrompt;
    readonly default_preset: typeof default_preset;
    readonly getPresetNames: typeof getPresetNames;
    readonly getLoadedPresetName: typeof getLoadedPresetName;
    readonly loadPreset: typeof loadPreset;
    readonly createPreset: typeof createPreset;
    readonly createOrReplacePreset: typeof createOrReplacePreset;
    readonly deletePreset: typeof deletePreset;
    readonly renamePreset: typeof renamePreset;
    readonly getPreset: typeof getPreset;
    readonly replacePreset: typeof replacePreset;
    readonly updatePresetWith: typeof updatePresetWith;
    readonly setPreset: typeof setPreset;

    // Raw_character
    readonly RawCharacter: typeof RawCharacter;
    readonly getCharData: typeof getCharData;
    readonly getCharAvatarPath: typeof getCharAvatarPath;
    readonly getChatHistoryBrief: typeof getChatHistoryBrief;
    readonly getChatHistoryDetail: typeof getChatHistoryDetail;

    // Script
    readonly getAllEnabledScriptButtons: typeof getAllEnabledScriptButtons;

    // Slash
    readonly triggerSlash: typeof triggerSlash;

    // Tavern_regex
    readonly formatAsTavernRegexedString: typeof formatAsTavernRegexedString;
    readonly isCharacterTavernRegexesEnabled: typeof isCharacterTavernRegexesEnabled;
    readonly getTavernRegexes: typeof getTavernRegexes;
    readonly replaceTavernRegexes: typeof replaceTavernRegexes;
    readonly updateTavernRegexesWith: typeof updateTavernRegexesWith;

    // Util
    readonly substitudeMacros: typeof substitudeMacros;
    readonly getLastMessageId: typeof getLastMessageId;
    readonly errorCatched: typeof errorCatched;
    readonly getMessageId: typeof getMessageId;

    // Variables
    readonly getVariables: typeof getVariables;
    readonly replaceVariables: typeof replaceVariables;
    readonly updateVariablesWith: typeof updateVariablesWith;
    readonly insertOrAssignVariables: typeof insertOrAssignVariables;
    readonly insertVariables: typeof insertVariables;
    readonly deleteVariable: typeof deleteVariable;

    // Version
    readonly getTavernHelperVersion: typeof getTavernHelperVersion;
    readonly getTavernHelperExtensionId: typeof getTavernHelperExtensionId;
    readonly getTavernVersion: typeof getTavernVersion;

    // Worldbook
    readonly getWorldbookNames: typeof getWorldbookNames;
    readonly getGlobalWorldbookNames: typeof getGlobalWorldbookNames;
    readonly rebindGlobalWorldbooks: typeof rebindGlobalWorldbooks;
    readonly getCharWorldbookNames: typeof getCharWorldbookNames;
    readonly rebindCharWorldbooks: typeof rebindCharWorldbooks;
    readonly getChatWorldbookName: typeof getChatWorldbookName;
    readonly rebindChatWorldbook: typeof rebindChatWorldbook;
    readonly getOrCreateChatWorldbook: typeof getOrCreateChatWorldbook;
    readonly createWorldbook: typeof createWorldbook;
    readonly createOrReplaceWorldbook: typeof createOrReplaceWorldbook;
    readonly deleteWorldbook: typeof deleteWorldbook;
    readonly getWorldbook: typeof getWorldbook;
    readonly replaceWorldbook: typeof replaceWorldbook;
    readonly updateWorldbookWith: typeof updateWorldbookWith;
    readonly createWorldbookEntries: typeof createWorldbookEntries;
    readonly deleteWorldbookEntries: typeof deleteWorldbookEntries;
  };

  /** Native SillyTavern API */
  SillyTavern: import('./st-api').SillyTavernGlobal;
  getContext: () => import('./st-api').SillyTavernContext;
}

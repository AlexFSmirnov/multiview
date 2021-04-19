import {
    ControlsMode,
    Layout,
    SettingsState,
    SettingsAction,
    SETTINGS_FULLSCREEN_ENTERED,
    SETTINGS_FULLSCREEN_EXITED,
    SETTINGS_CONTROLS_MODE_CHANGED,
    SETTINGS_LAYOUT_CHANGED,
    SETTINGS_FOCUSED_PLAYER_ID_CHANGED,
    SETTINGS_MAIN_PLAYER_IDS_CHANGED,
    SETTINGS_SECONDARY_PLAYER_IDS_CHANGED,
    SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED,
} from './types';

const settingsInitialState: SettingsState = {
    isFullscreen: false,
    controlsMode: ControlsMode.Individual,
    layout: Layout.Focused,
    focusedPlayerId: null,
    mainPlayerIds: [],
    secondaryPlayerIds: [],
};

export const settingsReducer = (state = settingsInitialState, action: SettingsAction) => {
    switch (action.type) {
        case SETTINGS_FULLSCREEN_ENTERED:
            return { ...state, isFullscreen: true };

        case SETTINGS_FULLSCREEN_EXITED:
            return { ...state, isFullscreen: false };

        case SETTINGS_CONTROLS_MODE_CHANGED:
        case SETTINGS_LAYOUT_CHANGED:
        case SETTINGS_FOCUSED_PLAYER_ID_CHANGED:
        case SETTINGS_MAIN_PLAYER_IDS_CHANGED:
        case SETTINGS_SECONDARY_PLAYER_IDS_CHANGED:
        case SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};

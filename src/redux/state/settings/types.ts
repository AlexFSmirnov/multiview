export enum ControlsMode {
    Grouped = 'Grouped',
    Individual = 'Individual',
}

export enum Layout {
    Grid = 'Grid',
    Focused = 'Focused',
    Overlay = 'Overlay',
}

export interface SettingsState {
    isFullscreen: boolean;
    controlsMode: ControlsMode;
    layout: Layout;
    focusedPlayerId: string | null;
    
    mainPlayerIds: string[];
    secondaryPlayerIds: string[];
}

export const SETTINGS_FULLSCREEN_ENTERED = 'SETTINGS_FULLSCREEN_ENTERED';
export const SETTINGS_FULLSCREEN_EXITED = 'SETTINGS_FULLSCREEN_EXITED';
export const SETTINGS_CONTROLS_MODE_CHANGED = 'SETTINGS_CONTROLS_MODE_CHANGED';
export const SETTINGS_LAYOUT_CHANGED = 'SETTINGS_LAYOUT_CHANGED';
export const SETTINGS_FOCUSED_PLAYER_ID_CHANGED = 'SETTINGS_FOCUSED_PLAYER_ID_CHANGED';
export const SETTINGS_MAIN_PLAYER_IDS_CHANGED = 'SETTINGS_MAIN_PLAYER_IDS_CHANGED';
export const SETTINGS_SECONDARY_PLAYER_IDS_CHANGED = 'SETTINGS_MAIN_SECONDARY_IDS_CHANGED';
export const SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED = 'SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED';

export interface SettingsFullscreenEnteredAction {
    type: typeof SETTINGS_FULLSCREEN_ENTERED;
}

export interface SettingsFullscreenExitedAction {
    type: typeof SETTINGS_FULLSCREEN_EXITED;
}

export interface SettingsControlsModeChangedAction {
    type: typeof SETTINGS_CONTROLS_MODE_CHANGED;
    payload: {
        controlsMode: ControlsMode;
    };
}

export interface SettingsLayoutChangedAction {
    type: typeof SETTINGS_LAYOUT_CHANGED;
    payload: {
        layout: Layout;
    };
}

export interface SettingsFocusedPlayerIdChangedAction {
    type: typeof SETTINGS_FOCUSED_PLAYER_ID_CHANGED;
    payload: {
        focusedPlayerId: string | null;
    };
}

export interface SettingsMainPlayerIdsChangedAction {
    type: typeof SETTINGS_MAIN_PLAYER_IDS_CHANGED;
    payload: {
        mainPlayerIds: string[];
    };
}

export interface SettingsSecondaryPlayerIdsChangedAction {
    type: typeof SETTINGS_SECONDARY_PLAYER_IDS_CHANGED;
    payload: {
        secondaryPlayerIds: string[];
    };
}

export interface SettingsMainAndSecondaryPlayerIdsChanged {
    type: typeof SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED;
    payload: {
        mainPlayerIds: string[];
        secondaryPlayerIds: string[];
    };
}

export type SettingsAction = (
    SettingsFullscreenEnteredAction | SettingsFullscreenExitedAction | SettingsControlsModeChangedAction |
    SettingsLayoutChangedAction | SettingsFocusedPlayerIdChangedAction | SettingsMainPlayerIdsChangedAction |
    SettingsSecondaryPlayerIdsChangedAction | SettingsMainAndSecondaryPlayerIdsChanged
);
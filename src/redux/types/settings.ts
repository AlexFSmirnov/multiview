export enum ControlsMode {
    Grouped = 'Grouped',
    Individual = 'Individual',
}

export interface SettingsState {
    isFullscreen: boolean;
    controlsMode: ControlsMode;
    focusedPlayerId: string | null;
}

export const SETTINGS_FULLSCREEN_ENTERED = 'SETTINGS_FULLSCREEN_ENTERED';
export const SETTINGS_FULLSCREEN_EXITED = 'SETTINGS_FULLSCREEN_EXITED';
export const SETTINGS_CONTROLS_MODE_CHANGED = 'SETTINGS_CONTROLS_MODE_CHANGED';
export const SETTINGS_FOCUSED_PLAYER_ID_CHANGED = 'SETTINGS_FOCUSED_PLAYER_ID_CHANGED';

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

export interface SettingsFocusedPlayerIdChangedAction {
    type: typeof SETTINGS_FOCUSED_PLAYER_ID_CHANGED;
    payload: {
        focusedPlayerId: string | null;
    };
}

export type SettingsAction = (
    SettingsFullscreenEnteredAction | SettingsFullscreenExitedAction | SettingsControlsModeChangedAction | SettingsFocusedPlayerIdChangedAction
);
import { AppThunkAction } from '../types';
import { getIsFullscreen } from './selectors';
import {
    ControlsMode,
    Layout,
    SettingsFullscreenEnteredAction,
    SettingsFullscreenExitedAction,
    SettingsControlsModeChangedAction,
    SettingsLayoutChangedAction,
    SettingsFocusedPlayerIdChangedAction,
    SETTINGS_FULLSCREEN_ENTERED,
    SETTINGS_FULLSCREEN_EXITED,
    SETTINGS_CONTROLS_MODE_CHANGED,
    SETTINGS_LAYOUT_CHANGED,
    SETTINGS_FOCUSED_PLAYER_ID_CHANGED,
} from './types';

export const setFullscreenOn = (): SettingsFullscreenEnteredAction => ({
    type: SETTINGS_FULLSCREEN_ENTERED,
});

export const setFullscreenOff = (): SettingsFullscreenExitedAction => ({
    type: SETTINGS_FULLSCREEN_EXITED,
});

export const changeControlsMode = (controlsMode: ControlsMode): SettingsControlsModeChangedAction => ({
    type: SETTINGS_CONTROLS_MODE_CHANGED,
    payload: { controlsMode },
});

export const changeLayout = (layout: Layout): SettingsLayoutChangedAction => ({
    type: SETTINGS_LAYOUT_CHANGED,
    payload: { layout },
});

export const changeFocusedPlayerId = (focusedPlayerId: string | null): SettingsFocusedPlayerIdChangedAction => ({
    type: SETTINGS_FOCUSED_PLAYER_ID_CHANGED,
    payload: { focusedPlayerId },
});

export const enterFullscreen = (): AppThunkAction => dispatch => {
    dispatch(setFullscreenOn());
    dispatch(changeControlsMode(ControlsMode.Grouped));
};

export const exitFullscreen = (): AppThunkAction => dispatch => {
    dispatch(setFullscreenOff());
    dispatch(changeControlsMode(ControlsMode.Individual));
};

export const toggleFullscreen = (): AppThunkAction => (dispatch, getState) => {
    const isFullscreen = getIsFullscreen(getState());

    if (isFullscreen) {
        dispatch(exitFullscreen());
    } else {
        dispatch(enterFullscreen());
    }
};

import { AppThunkAction } from '../types';
import { getIsFullscreen, getMainPlayerIds, getSecondaryPlayerIds } from './selectors';
import {
    ControlsMode,
    Layout,
    SettingsFullscreenEnteredAction,
    SettingsFullscreenExitedAction,
    SettingsControlsModeChangedAction,
    SettingsLayoutChangedAction,
    SettingsFocusedPlayerIdChangedAction,
    SettingsMainPlayerIdsChangedAction,
    SettingsSecondaryPlayerIdsChangedAction,
    SETTINGS_FULLSCREEN_ENTERED,
    SETTINGS_FULLSCREEN_EXITED,
    SETTINGS_CONTROLS_MODE_CHANGED,
    SETTINGS_LAYOUT_CHANGED,
    SETTINGS_FOCUSED_PLAYER_ID_CHANGED,
    SETTINGS_MAIN_PLAYER_IDS_CHANGED,
    SETTINGS_SECONDARY_PLAYER_IDS_CHANGED,
    SettingsMainAndSecondaryPlayerIdsChanged,
    SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED,
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

export const setMainPlayerIds = (mainPlayerIds: string[]): SettingsMainPlayerIdsChangedAction => ({
    type: SETTINGS_MAIN_PLAYER_IDS_CHANGED,
    payload: { mainPlayerIds },
});

export const setSecondaryPlayerIds = (secondaryPlayerIds: string[]): SettingsSecondaryPlayerIdsChangedAction => ({
    type: SETTINGS_SECONDARY_PLAYER_IDS_CHANGED,
    payload: { secondaryPlayerIds },
});

export const setMainAndSecondaryPlayerIds = (payload: { mainPlayerIds: string[]; secondaryPlayerIds: string[] }): SettingsMainAndSecondaryPlayerIdsChanged => ({
    type: SETTINGS_MAIN_AND_SECONDARY_PLAYER_IDS_CHANGED,
    payload,
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

export const addPlayerToMainPlayers = (playerId: string): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    const mainPlayerIds = getMainPlayerIds(state);
    const secondaryPlayerIds = getSecondaryPlayerIds(state);

    dispatch(setMainAndSecondaryPlayerIds({
        mainPlayerIds: [...mainPlayerIds, playerId],
        secondaryPlayerIds: secondaryPlayerIds.filter(id => id !== playerId),
    }));
};

export const addPlayerToSecondaryPlayers = (playerId: string): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    const mainPlayerIds = getMainPlayerIds(state);
    const secondaryPlayerIds = getSecondaryPlayerIds(state);

    dispatch(setMainAndSecondaryPlayerIds({
        mainPlayerIds: mainPlayerIds.filter(id => id !== playerId),
        secondaryPlayerIds: [...secondaryPlayerIds, playerId],
    }));
};

export const makePlayerMain = (playerId: string): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    const mainPlayerIds = getMainPlayerIds(state);
    const secondaryPlayerIds = getSecondaryPlayerIds(state);

    dispatch(setMainAndSecondaryPlayerIds({
        mainPlayerIds: [playerId],
        secondaryPlayerIds: [...mainPlayerIds, ...secondaryPlayerIds].filter(id => id !== playerId),
    }));
};

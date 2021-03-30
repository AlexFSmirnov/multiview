import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';
import { State } from '../types';
import { getPlayersInfoState } from '../playersInfo/selectors';
import { getMasterPlayerInfo } from '../masterPlayerInfo/selectors';
import { SettingsState, ControlsMode, Layout } from './types';

export const getSettingsState = (state: State) => state.settings;

export const getIsFullscreen = createSelector<State, SettingsState, boolean>(
    getSettingsState,
    get('isFullscreen'),
);

export const getControlsMode = createSelector<State, SettingsState, ControlsMode>(
    getSettingsState,
    get('controlsMode'),
);

export const getLayout = createSelector<State, SettingsState, Layout>(
    getSettingsState,
    get('layout'),
);

export const getFocusedPlayerId = createSelector<State, SettingsState, string | null>(
    getSettingsState,
    get('focusedPlayerId'),
);

export const getFocusedPlayerInfo = createSelector(
    getFocusedPlayerId,
    getPlayersInfoState,
    getMasterPlayerInfo,
    (focusedPlayerId, playersInfo, masterPlayerInfo) => {
        if (focusedPlayerId) {
            return playersInfo[focusedPlayerId];
        }

        return masterPlayerInfo;
    },
);

export const getIsFocusedPlayerPlaying = createSelector(
    getFocusedPlayerInfo,
    getOr(false, 'isPlaying'),
);

export const getFocusedPlayerDurationSeconds = createSelector(
    getFocusedPlayerInfo,
    getOr(0, 'durationSeconds'),
);

export const getFocusedPlayerPlayedSeconds = createSelector(
    getFocusedPlayerInfo,
    getOr(0, 'playedSeconds'),
);

export const getFocusedPlayerVolume = createSelector(
    getFocusedPlayerInfo,
    getOr(1, 'volume'),
);

export const getIsFocusedPlayerMuted = createSelector(
    getFocusedPlayerInfo,
    getOr(false, 'isMuted'),
);

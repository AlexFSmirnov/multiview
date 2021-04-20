import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { contains, get, getOr } from 'lodash/fp';
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

export const getMainPlayerIds = createSelector<State, SettingsState, string[]>(
    getSettingsState,
    get('mainPlayerIds'),
);

export const getSecondaryPlayerIds = createSelector<State, SettingsState, string[]>(
    getSettingsState,
    get('secondaryPlayerIds'),
);

const getIsPlayerMainBase = (id: string) => createSelector<State, string[], boolean>(
    getMainPlayerIds,
    contains(id),
);
export const getIsPlayerMain = memoize(getIsPlayerMainBase);

const getIsPlayerSecondaryBase = (id: string) => createSelector<State, string[], boolean>(
    getSecondaryPlayerIds,
    contains(id),
);
export const getIsPlayerSecondary = memoize(getIsPlayerSecondaryBase);

const canMovePlayerLeftBase = (id: string) => createSelector<State, string[], string[], Layout, boolean>(
    getMainPlayerIds,
    getSecondaryPlayerIds,
    getLayout,
    (mainPlayerIds, secondaryPlayerIds, layout) => {
        const indexInMain = mainPlayerIds.indexOf(id);
        const indexInSecondary = secondaryPlayerIds.indexOf(id);

        if (indexInMain === 0) {
            return false;
        }

        if (indexInSecondary === 0 && layout === Layout.Overlay) {
            return false;
        }
        
        return true;
    },
);
export const canMovePlayerLeft = memoize(canMovePlayerLeftBase);

const canMovePlayerRightBase = (id: string) => createSelector<State, string[], string[], Layout, boolean>(
    getMainPlayerIds,
    getSecondaryPlayerIds,
    getLayout,
    (mainPlayerIds, secondaryPlayerIds, layout) => {
        const indexInMain = mainPlayerIds.indexOf(id);
        const indexInSecondary = secondaryPlayerIds.indexOf(id);

        if (indexInSecondary === secondaryPlayerIds.length - 1) {
            return false;
        }

        if (indexInMain === mainPlayerIds.length - 1 && layout === Layout.Overlay) {
            return false;
        }
        
        return true;
    },
);
export const canMovePlayerRight = memoize(canMovePlayerRightBase);

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

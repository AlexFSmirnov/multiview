import { createSelector } from 'reselect';
import { getOr } from 'lodash/fp';
import { State } from '../types';
import { MasterPlayerInfoState } from '../reducers/masterPlayerInfo';

export const getMasterPlayerInfo = (state: State) => state.masterPlayerInfo;

export const getIsMasterPlayerPlaying = createSelector(
    getMasterPlayerInfo,
    getOr(false, 'isPlaying'),
);

export const getIsMasterPlayerBuffering = createSelector(
    getMasterPlayerInfo,
    getOr(false, 'isBuffering'),
);

export const getMasterPlayerDurationSeconds = createSelector(
    getMasterPlayerInfo,
    getOr(0, 'durationSeconds'),
);

export const getMasterPlayerPlayedTime = createSelector(
    getMasterPlayerInfo,
    ({ playedSeconds, playedFraction }: MasterPlayerInfoState) => ({ playedSeconds, playedFraction }),
);

export const getMasterPlayerPlayedSeconds = createSelector(
    getMasterPlayerPlayedTime,
    getOr(0, 'playedSeconds'),
);

export const getMasterPlayerPlayedFraction = createSelector(
    getMasterPlayerPlayedTime,
    getOr(0, 'playedFraction'),
);

export const getMasterPlayerLoadedTime = createSelector(
    getMasterPlayerInfo,
    ({ loadedSeconds, loadedFraction }: MasterPlayerInfoState) => ({ loadedSeconds, loadedFraction }),
);

export const getMasterPlayerLoadedSeconds = createSelector(
    getMasterPlayerLoadedTime,
    getOr(0, 'loadedSeconds'),
);

export const getMasterPlayerLoadedFraction = createSelector(
    getMasterPlayerLoadedTime,
    getOr(0, 'loadedFraction'),
);

export const getMasterPlayerVolume = createSelector(
    getMasterPlayerInfo,
    getOr(1, 'volume'),
);

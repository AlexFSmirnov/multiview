import { createSelector } from 'reselect';
import { getOr } from 'lodash/fp';
import { State } from '../types';
import { MasterPlayerInfoState } from '../reducers/masterPlayerInfo';

export const getMasterPlayerInfo = (state: State) => state.masterPlayerInfo;

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

export const getMasterPlayerLoadedTime = createSelector(
    getMasterPlayerInfo,
    ({ loadedSeconds, loadedFraction }: MasterPlayerInfoState) => ({ loadedSeconds, loadedFraction }),
);

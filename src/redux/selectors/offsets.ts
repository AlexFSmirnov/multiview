import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { get, getOr, compose, reduce, values, entries } from 'lodash/fp';
import { State } from '../types';
import { OffsetsState } from '../reducers/offsets';
import { getMaxDuration, getPlayersInfoState } from './playersInfo';
import { PlayersInfoState } from '../reducers/playersInfo';

export const getOffsetsState = (state: State) => state.offsets;

export const getOffsetsReferencePlayerId = createSelector<State, OffsetsState, string | null>(
    getOffsetsState,
    get('referencePlayerId'),
);

export const getOffsets = createSelector<State, OffsetsState, Record<string, number>>(
    getOffsetsState,
    get('offsets'),
);

const getPlayerOffsetBase = (id: string) => createSelector(
    getOffsets,
    getOr(0, id),
);
export const getPlayerOffset = memoize(getPlayerOffsetBase);

export const getMaxOffsetUnderflow = createSelector(
    getOffsets,
    compose(
        reduce((acc, offset) => Math.max(acc, offset), 0),
        values,
    ),
);

export const getMaxOffsetOverflow = createSelector(
    getOffsets,
    getPlayersInfoState,
    getMaxDuration,
    (offsets: Record<string, number>, playersInfo: PlayersInfoState, maxDuration: number) => reduce(
        (acc: number, curr: [string, number]) => {
            const [playerId, offset] = curr;
            const playerDuration = playersInfo[playerId].durationSeconds;

            return Math.max(acc, playerDuration - offset - maxDuration);
        },
        0,
        entries(offsets),
    ),
);
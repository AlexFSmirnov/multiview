import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { get, getOr } from 'lodash/fp';
import { State, OffsetsState } from '../types';

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

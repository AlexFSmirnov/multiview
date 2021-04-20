import { AppThunkAction } from '../types';
import { getOffsets } from './selectors';
import { OffsetsReferencePlayerIdChangedAction, PlayerOffsetChangedAction, PlayerOffsetRemovedAction, OFFSETS_REFERENCE_PLAYER_ID_CHANGED, PLAYER_OFFSET_CHANGED, PLAYER_OFFSET_REMOVED } from './types';

export const changeOffsetsReferencePlayerId = (referenceId: string | null): OffsetsReferencePlayerIdChangedAction => ({
    type: OFFSETS_REFERENCE_PLAYER_ID_CHANGED,
    payload: { referenceId },
});

export const changePlayerOffset = (id: string, { offset }: { offset: number }): PlayerOffsetChangedAction => ({
    type: PLAYER_OFFSET_CHANGED,
    payload: { id, offset },
});

export const removePlayerOffset = (id: string): PlayerOffsetRemovedAction => ({
    type: PLAYER_OFFSET_REMOVED,
    payload: { id },
});

export const normalizeOffsets = (): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    const { maxOffset, maxOffsetPlayerId } = Object.entries(getOffsets(state)).reduce(
        (acc, [playerId, playerOffset]) => {
            if (playerOffset > acc.maxOffset) {
                return {
                    maxOffset: playerOffset,
                    maxOffsetPlayerId: playerId,
                };
            }

            return acc;
        },
        {
            maxOffset: -Infinity,
            maxOffsetPlayerId: '',
        },
    );

    if (maxOffsetPlayerId !== '' && Math.abs(maxOffset) > 1.5) {
        dispatch(changeOffsetsReferencePlayerId(maxOffsetPlayerId));
        dispatch(changePlayerOffset(maxOffsetPlayerId, { offset: 0 }));
        
        Object.entries(getOffsets(state)).forEach(([playerId, playerOffset]) => {
            if (playerId !== maxOffsetPlayerId) {
                dispatch(changePlayerOffset(playerId, {
                    offset: playerOffset - maxOffset,
                }));
            }
        });
    }
};

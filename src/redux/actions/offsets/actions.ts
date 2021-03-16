import { OffsetsReferencePlayerIdChangedAction, PlayerOffsetChangedAction, OFFSETS_REFERENCE_PLAYER_ID_CHANGED, PLAYER_OFFSET_CHANGED } from './types';

export const changeOffsetsReferencePlayerId = (referenceId: string): OffsetsReferencePlayerIdChangedAction => ({
    type: OFFSETS_REFERENCE_PLAYER_ID_CHANGED,
    payload: { referenceId },
});

export const changePlayerOffset = (id: string, { offset }: { offset: number }): PlayerOffsetChangedAction => ({
    type: PLAYER_OFFSET_CHANGED,
    payload: { id, offset },
});

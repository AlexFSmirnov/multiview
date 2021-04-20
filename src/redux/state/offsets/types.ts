export interface OffsetsState {
    // Reference player always is the first one to play ("the least offset").
    referencePlayerId: string | null;

    // All offsets should be negative (meaning all non-reference players will be offset "to the future")
    offsets: Record<string, number>;
}

export const OFFSETS_REFERENCE_PLAYER_ID_CHANGED = 'OFFSETS_REFERENCE_PLAYER_ID_CHANGED';
export const PLAYER_OFFSET_CHANGED = 'PLAYER_OFFSET_CHANGED';
export const PLAYER_OFFSET_REMOVED = 'PLAYER_OFFSET_REMOVED';

export interface OffsetsReferencePlayerIdChangedAction {
    type: typeof OFFSETS_REFERENCE_PLAYER_ID_CHANGED;
    payload: {
        referenceId: string | null;
    };
}

export interface PlayerOffsetChangedAction {
    type: typeof PLAYER_OFFSET_CHANGED;
    payload: {
        id: string;
        offset: number;
    };
}

export interface PlayerOffsetRemovedAction {
    type: typeof PLAYER_OFFSET_REMOVED;
    payload: {
        id: string;
    };
}

export type OffsetsAction = OffsetsReferencePlayerIdChangedAction | PlayerOffsetChangedAction | PlayerOffsetRemovedAction;

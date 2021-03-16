export const OFFSETS_REFERENCE_PLAYER_ID_CHANGED = 'OFFSETS_REFERENCE_PLAYER_ID_CHANGED';
export const PLAYER_OFFSET_CHANGED = 'PLAYER_OFFSET_CHANGED';

export interface OffsetsReferencePlayerIdChangedAction {
    type: typeof OFFSETS_REFERENCE_PLAYER_ID_CHANGED;
    payload: {
        referenceId: string;
    };
}

export interface PlayerOffsetChangedAction {
    type: typeof PLAYER_OFFSET_CHANGED;
    payload: {
        id: string;
        offset: number;
    };
}

export type OffsetsAction = OffsetsReferencePlayerIdChangedAction | PlayerOffsetChangedAction;

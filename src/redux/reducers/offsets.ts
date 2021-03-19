import { OffsetsAction, OFFSETS_REFERENCE_PLAYER_ID_CHANGED, PLAYER_OFFSET_CHANGED } from '../actions/offsets';

export interface OffsetsState {
    // Reference player always is the first one to play ("the least offset").
    referencePlayerId: string | null;

    // All offsets should be negative (meaning all non-reference players will be offset "to the future")
    offsets: Record<string, number>;
}
export const offsetsInitialState: OffsetsState = {
    referencePlayerId: null,
    offsets: {},
};

export const offsetsReducer = (state = offsetsInitialState, action: OffsetsAction) => {
    switch (action.type) {
        case OFFSETS_REFERENCE_PLAYER_ID_CHANGED:
            return { ...state, referencePlayerId: action.payload.referenceId };

        case PLAYER_OFFSET_CHANGED:
            const { id, offset } = action.payload;
            return {
                ...state,
                offsets: {
                    ...state.offsets,
                    [id]: offset,
                },
            };

        default:
            return state;
    }
};

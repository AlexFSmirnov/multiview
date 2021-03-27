import { OffsetsState, OffsetsAction, OFFSETS_REFERENCE_PLAYER_ID_CHANGED, PLAYER_OFFSET_CHANGED } from './types';

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

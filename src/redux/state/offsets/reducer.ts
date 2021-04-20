import { omit } from 'lodash/fp';
import { OffsetsState, OffsetsAction, OFFSETS_REFERENCE_PLAYER_ID_CHANGED, PLAYER_OFFSET_CHANGED, PLAYER_OFFSET_REMOVED } from './types';

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

        case PLAYER_OFFSET_REMOVED:
            return {
                ...state,
                offsets: omit(action.payload.id, state.offsets),
            };

        default:
            return state;
    }
};

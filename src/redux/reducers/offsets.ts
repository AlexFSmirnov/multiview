import { OffsetsAction } from '../actions/offsets';

export interface OffsetsState {
    referencePlayerId: string | null;
    offsets: Record<string, number>;
}
export const offsetsInitialState: OffsetsState = {
    referencePlayerId: null,
    offsets: {},
};

export const offsetsReducer = (state = offsetsInitialState, action: OffsetsAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

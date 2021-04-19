import { Middleware } from 'redux';
import {
    Action,
    AppThunkDispatch,
    State,
    VIDEOS_ADDED,
    VIDEO_REMOVED,
} from '../types';
import {
    addPlayerToMainPlayers,
    addPlayerToSecondaryPlayers,
    setMainAndSecondaryPlayerIds,
} from '../actions';
import {
    getMainPlayerIds,
    getSecondaryPlayerIds,
} from '../selectors';

export const playerGroupsMiddleware: Middleware<{}, State, AppThunkDispatch> = store => next => (action: Action) => {
    const { dispatch, getState } = store;

    const state = getState();
    const mainPlayerIds = getMainPlayerIds(state);
    const secondaryPlayerIds = getSecondaryPlayerIds(state);

    switch (action.type) {
        case VIDEOS_ADDED:
            Object.keys(action.payload).forEach((id, i) => {
                if (i === 0 && mainPlayerIds.length === 0) {
                    dispatch(addPlayerToMainPlayers(id));
                } else {
                    dispatch(addPlayerToSecondaryPlayers(id));
                }
            });
            break;

        case VIDEO_REMOVED:
            dispatch(setMainAndSecondaryPlayerIds({
                mainPlayerIds: mainPlayerIds.filter(id => id !== action.payload.id),
                secondaryPlayerIds: secondaryPlayerIds.filter(id => id !== action.payload.id),
            }));
            break;
    }

    next(action);
};

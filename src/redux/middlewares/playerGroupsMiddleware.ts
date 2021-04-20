import { Middleware } from 'redux';
import {
    Action,
    AppThunkDispatch,
    State,
    VIDEOS_ADDED,
    VIDEO_REMOVED,
} from '../types';
import {
    movePlayerToMainPlayers,
    movePlayerToSecondaryPlayers,
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
                    dispatch(movePlayerToMainPlayers(id));
                } else {
                    dispatch(movePlayerToSecondaryPlayers(id));
                }
            });
            break;

        case VIDEO_REMOVED:
            if (mainPlayerIds.length === 1 && mainPlayerIds[0] === action.payload.id && secondaryPlayerIds.length > 0) {
                const newMainPlayerId = secondaryPlayerIds[0];
                dispatch(setMainAndSecondaryPlayerIds({
                    mainPlayerIds: [newMainPlayerId],
                    secondaryPlayerIds: secondaryPlayerIds.filter(id => id !== newMainPlayerId),
                }));
                break;
            }

            dispatch(setMainAndSecondaryPlayerIds({
                mainPlayerIds: mainPlayerIds.filter(id => id !== action.payload.id),
                secondaryPlayerIds: secondaryPlayerIds.filter(id => id !== action.payload.id),
            }));
            break;
    }

    next(action);
};

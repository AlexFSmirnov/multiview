import { Middleware } from 'redux';
import {
    Action,
    AppThunkDispatch,
    State,
    PLAYER_PLAYED_TIME_UPDATED,
    PLAYER_PROGRESS_UPDATED,
    VIDEO_DELETED,
} from '../types';
import {
    getOffsets,
    areAllCorrectPlayersPlaying,
    getPlayersInfoState,
    shouldPlayerCurrentlyPlay,
    getOffsetsReferencePlayerId,
    getMasterPendingSeek,
    getMasterPlayerPlayedSeconds,
} from '../selectors';
import {
    changeOffsetsReferencePlayerId,
    changePlayerOffset,
    normalizeOffsets,
    playerStartPlaying,
    removePlayerOffset,
} from '../actions';

export const offsetsMiddleware: Middleware<{}, State, AppThunkDispatch> = store => next => (action: Action) => {
    const { dispatch, getState } = store;

    const prevState = getState();
    next(action);
    const state = getState();

    const referencePlayerId = getOffsetsReferencePlayerId(state);

    switch (action.type) {
        case VIDEO_DELETED:
            const { id: removedId } = action.payload;

            dispatch(removePlayerOffset(removedId));

            if (Object.keys(getOffsets(prevState)).length === 1) {
                dispatch(changeOffsetsReferencePlayerId(null));
            } else {
                dispatch(normalizeOffsets());
            }

            break;

        case PLAYER_PLAYED_TIME_UPDATED:
        case PLAYER_PROGRESS_UPDATED:
            const { id } = action.payload;

            if (referencePlayerId === null) {
                dispatch(changeOffsetsReferencePlayerId(id));
                dispatch(changePlayerOffset(id, { offset: 0 }));
                break;
            }

            if (areAllCorrectPlayersPlaying(state) || getMasterPendingSeek(prevState) !== null) {
                break;
            }

            if (areAllCorrectPlayersPlaying(prevState) && !areAllCorrectPlayersPlaying(state)) {
                Object.keys(getPlayersInfoState(state)).forEach(playerId => {
                    if (shouldPlayerCurrentlyPlay(playerId)(state)) {
                        dispatch(playerStartPlaying(playerId));
                    }
                });
            }

            Object.entries(getPlayersInfoState(state)).forEach(([playerId, playerInfo]) => {
                if (shouldPlayerCurrentlyPlay(playerId)(prevState)) {
                    dispatch(changePlayerOffset(playerId, {
                        offset: playerInfo.playedSeconds - getMasterPlayerPlayedSeconds(state),
                    }));
                }
            });

            dispatch(normalizeOffsets());
            break;
    }
};

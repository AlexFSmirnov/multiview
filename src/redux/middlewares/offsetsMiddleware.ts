import { Middleware } from 'redux';
import { Action, State } from '../types';
import { changeOffsetsReferencePlayerId, changePlayerOffset } from '../actions/offsets';
import { PLAYER_DURATION_UPDATED, PLAYER_PLAYED_TIME_UPDATED, PLAYER_PROGRESS_UPDATED } from '../actions/playersInfo';

export const offsetsMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
    const { dispatch, getState } = store;
    const state = getState();

    const referencePlayerId = state.offsets.referencePlayerId;
    let id = '';

    switch (action.type) {
        case PLAYER_PLAYED_TIME_UPDATED:
        case PLAYER_PROGRESS_UPDATED:
            id = action.payload.id;
            const { playedSeconds } = action.payload;

            if (referencePlayerId === null) {
                dispatch(changeOffsetsReferencePlayerId(id));
                dispatch(changePlayerOffset(id, { offset: 0 }));
                break;
            }

            if (id === referencePlayerId) {
                Object.entries(state.playersInfo).forEach(([playerId, playerInfo]) => {
                    if (playerId !== referencePlayerId && playerInfo.playedSeconds >= 1 && !playerInfo.hasEnded) {
                        dispatch(changePlayerOffset(playerId, {
                            offset: playerInfo.playedSeconds - playedSeconds,
                        }));
                    }
                });
                break;
            }

            if (state.playersInfo[referencePlayerId].playedSeconds < 1 || state.playersInfo[referencePlayerId].hasEnded) {
                break;
            }

            const offset = playedSeconds - state.playersInfo[referencePlayerId].playedSeconds;
            dispatch(changePlayerOffset(id, { offset }));

            break;

        case PLAYER_DURATION_UPDATED:
            id = action.payload.id;

            if (referencePlayerId === null) {
                dispatch(changeOffsetsReferencePlayerId(id));
                dispatch(changePlayerOffset(id, { offset: 0 }));
                break;
            }

            const { durationSeconds: playerDuration } = action.payload;
            const {
                durationSeconds: referencePlayerDuration,
                playedSeconds: referencePlayedSeconds,
            } = state.playersInfo[referencePlayerId];

            // Reference player should always have the highest duration.
            if (playerDuration > referencePlayerDuration) {
                dispatch(changeOffsetsReferencePlayerId(id));

                Object.keys(state.playersInfo).forEach(playerId => {
                    if (playerId !== id) {
                        dispatch(changePlayerOffset(playerId, {
                            offset: state.offsets.offsets[playerId] - referencePlayedSeconds,
                        }));
                    }
                });

                dispatch(changePlayerOffset(id, { offset: 0 }));
                break;
            }

            break;
    }

    next(action);
};

import { Middleware } from 'redux';
import { Action, State } from '../types';
import { changeOffsetsReferencePlayerId, changePlayerOffset } from '../actions/offsets';
import { PLAYER_PLAYED_TIME_UPDATED, PLAYER_PROGRESS_UPDATED } from '../actions/playersInfo';

export const offsetsMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
    const { dispatch, getState } = store;
    const state = getState();

    const referencePlayerId = state.offsets.referencePlayerId;

    switch (action.type) {
        case PLAYER_PLAYED_TIME_UPDATED:
        case PLAYER_PROGRESS_UPDATED:
            const { id, playedSeconds } = action.payload;

            if (referencePlayerId === null) {
                dispatch(changeOffsetsReferencePlayerId(id));
                dispatch(changePlayerOffset(id, { offset: 0 }));
                break;
            }

            // TODO: Rework this part, since stopped / not started players should not change their offset while the other players are playing.
            if (id === referencePlayerId) {
                Object.entries(state.playersInfo).forEach(([playerId, playerInfo]) => {
                    if (playerId !== referencePlayerId) {
                        dispatch(changePlayerOffset(playerId, {
                            offset: playerInfo.playedSeconds - playedSeconds,
                        }));
                    }
                });
                break;
            }

            const playerDuration = state.playersInfo[id].durationSeconds || 0;
            const referencePlayerDuration = state.playersInfo[referencePlayerId].durationSeconds || 0;

            // Reference player should always have the highest duration.
            if (playerDuration > referencePlayerDuration) {
                Object.entries(state.playersInfo).forEach(([playerId, playerInfo]) => {
                    if (playerId !== id) {
                        // dispatch(changePlayerOffset())
                    }
                });

                break;
            }

            const referencePlayedSeconds = state.playersInfo[referencePlayerId].playedSeconds;
            const offset = playedSeconds - referencePlayedSeconds;
            dispatch(changePlayerOffset(id, { offset }));

            break;
    }

    next(action);
};

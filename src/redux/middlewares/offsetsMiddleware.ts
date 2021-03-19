import { Middleware } from 'redux';
import { Action, State } from '../types';
import { changeOffsetsReferencePlayerId, changePlayerOffset } from '../actions/offsets';
import { PLAYER_PLAYED_TIME_UPDATED, PLAYER_PROGRESS_UPDATED } from '../actions/playersInfo';
import { getPlayersInfoState } from '../selectors/playersInfo';
import { getOffsets, getOffsetsReferencePlayerId } from '../selectors';
import { getMasterPlayerPlayedSeconds } from '../selectors/masterPlayerInfo';

export const offsetsMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
    next(action);

    const { dispatch, getState } = store;
    const state = getState();

    switch (action.type) {
        case PLAYER_PLAYED_TIME_UPDATED:
        case PLAYER_PROGRESS_UPDATED:
            const { id, playedSeconds } = action.payload;
            const referencePlayerId = getOffsetsReferencePlayerId(state);

            if (referencePlayerId === null) {
                dispatch(changeOffsetsReferencePlayerId(id));
                dispatch(changePlayerOffset(id, { offset: 0 }));
                break;
            }

            if (id === referencePlayerId) {
                Object.entries(getPlayersInfoState(state)).forEach(([playerId, playerInfo]) => {
                    if (playerId !== referencePlayerId && playerInfo.playedSeconds >= 0.0001 && !playerInfo.hasEnded) {
                        dispatch(changePlayerOffset(playerId, {
                            offset: playerInfo.playedSeconds - playedSeconds,
                        }));
                    }
                });
                break;
            }

            const offset = playedSeconds - getMasterPlayerPlayedSeconds(state);

            // All offsets should be negative, i.e. the reference player should play first.
            // Checking for > 1.5 instead of 0 to account for the order of onProgress calls.
            if (offset > 1.5) {
                dispatch(changeOffsetsReferencePlayerId(id));
                dispatch(changePlayerOffset(id, { offset: 0 }));

                Object.entries(getOffsets(state)).forEach(([playerId, oldOffset]) => {
                    if (playerId !== id) {
                        dispatch(changePlayerOffset(playerId, {
                            offset: oldOffset - offset,
                        }));
                    }
                });

                break;
            }

            dispatch(changePlayerOffset(id, { offset }));
            break;
    }
};

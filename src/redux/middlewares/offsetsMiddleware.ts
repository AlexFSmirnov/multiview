import { Middleware } from 'redux';
import { Action, State } from '../types';
import { changeOffsetsReferencePlayerId, changePlayerOffset } from '../actions/offsets';
import { PLAYER_PLAYED_TIME_UPDATED, PLAYER_PROGRESS_UPDATED } from '../actions/playersInfo';
import { areAllCorrectPlayersPlaying, getPlayersInfoState, shouldPlayerCurrentlyPlay } from '../selectors/playersInfo';
import { getOffsets, getOffsetsReferencePlayerId } from '../selectors';
import { getIsMasterPlayerBuffering, getMasterPlayerPlayedSeconds } from '../selectors/masterPlayerInfo';

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

            if (getIsMasterPlayerBuffering(state) || areAllCorrectPlayersPlaying(state)) {
                break;
            }

            const masterPlayedSeconds = getMasterPlayerPlayedSeconds(state);
            const offset = playedSeconds - masterPlayedSeconds;

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

            Object.entries(getPlayersInfoState(state)).forEach(([playerId, playerInfo]) => {
                if (playerId !== referencePlayerId && shouldPlayerCurrentlyPlay(playerId)(state)) {
                    const playerPlayedSeconds = playerId === id ? playedSeconds : playerInfo.playedSeconds;
                    dispatch(changePlayerOffset(playerId, {
                        offset: playerPlayedSeconds - masterPlayedSeconds,
                    }));
                }
            });

            break;
    }
};

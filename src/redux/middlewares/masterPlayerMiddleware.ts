import { Middleware } from 'redux';
import { Action, State } from '../types';
import { VIDEOS_ADDED, VIDEO_ADDED } from '../actions/videos';
import { PLAYER_OFFSET_CHANGED } from '../actions/offsets';
import {
    PlayerInfo,
    PLAYER_LOADED_TIME_UPDATED,
    PLAYER_PLAYED_TIME_UPDATED,
    PLAYER_PROGRESS_UPDATED,
    PLAYER_READY,
    PLAYER_STARTED_BUFFERING,
    PLAYER_STARTED_PLAYING,
    PLAYER_STOPPED_BUFFERING,
    PLAYER_STOPPED_PLAYING,
} from '../actions/playersInfo';
import {
    masterPlayerReady,
    masterPlayerNotReady,
    masterPlayerStartPlaying,
    masterPlayerStopPlaying,
    masterPlayerStartBuffering,
    masterPlayerStopBuffering,
    masterPlayerUpdateDuration,
    masterPlayerUpdatePlayedTime,
    masterPlayerUpdateLoadedTime,
} from '../actions/masterPlayerInfo';

const everyOtherPlayer = (condition: (playerInfo: PlayerInfo) => boolean, state: State, currentId: string) => (
    Object.entries(state.playersInfo).every(([id, playerInfo]) => id === currentId || condition(playerInfo))
);

export const masterPlayerMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
    const { dispatch, getState } = store;
    let state = getState();

    let maxOffsetUnderflow = 0;

    next(action);
    switch (action.type) {
        case PLAYER_READY:
            if (everyOtherPlayer(player => player.isReady, state, action.payload.id)) {
                dispatch(masterPlayerReady());
            }
            break;

        case PLAYER_STARTED_PLAYING:
            dispatch(masterPlayerStartPlaying());
            break;

        case PLAYER_STOPPED_PLAYING:
            if (everyOtherPlayer(player => !player.isPlaying, state, action.payload.id)) {
                dispatch(masterPlayerStopPlaying());
            }
            break;

        case PLAYER_STARTED_BUFFERING:
            dispatch(masterPlayerStartBuffering());
            break;

        case PLAYER_STOPPED_BUFFERING:
            if (everyOtherPlayer(player => !player.isBuffering, state, action.payload.id)) {
                dispatch(masterPlayerStopBuffering());
            }
            break;

        case PLAYER_PLAYED_TIME_UPDATED:
        case PLAYER_LOADED_TIME_UPDATED:
        case PLAYER_PROGRESS_UPDATED:
            const { isBuffering, isReady } = state.playersInfo[action.payload.id];
            if (isBuffering || !isReady) {
                break;
            }

            state = getState();

            maxOffsetUnderflow = Object.values(state.offsets.offsets).reduce((acc, offset) => Math.max(acc, offset), 0);
            if (action.type === PLAYER_PLAYED_TIME_UPDATED || action.type === PLAYER_PROGRESS_UPDATED) {
                const masterPlayedSeconds = Object.entries(state.playersInfo).reduce((acc, curr) => {
                    const [playerId, playerInfo] = curr;
                    const { isBuffering, isReady, hasEnded, playedSeconds } = playerInfo;

                    if (isBuffering || !isReady || hasEnded || playedSeconds < 1) {
                        return acc;
                    }

                    const playerOffset = state.offsets.offsets[playerId] || 0;
                    const offsetPlayedTime = playedSeconds - playerOffset + maxOffsetUnderflow;

                    return Math.min(acc, offsetPlayedTime);
                }, state.masterPlayerInfo.durationSeconds);

                const masterPlayedFraction = masterPlayedSeconds / state.masterPlayerInfo.durationSeconds;

                dispatch(masterPlayerUpdatePlayedTime({
                    playedSeconds: masterPlayedSeconds,
                    playedFraction: masterPlayedFraction,
                }));
            }

            if (action.type === PLAYER_LOADED_TIME_UPDATED || action.type === PLAYER_PROGRESS_UPDATED) {
                const masterLoadedSeconds = Object.entries(state.playersInfo).reduce((acc, curr) => {
                    const [playerId, playerInfo] = curr;
                    const { isBuffering, isReady, hasEnded, loadedSeconds, playedSeconds } = playerInfo;

                    if (isBuffering || !isReady || hasEnded || playedSeconds < 1) {
                        return acc;
                    }

                    const playerOffset = state.offsets.offsets[playerId] || 0;
                    const offsetLoadedTime = loadedSeconds - playerOffset + maxOffsetUnderflow;

                    return Math.min(acc, offsetLoadedTime);
                }, state.masterPlayerInfo.durationSeconds);

                const masterLoadedFraction = masterLoadedSeconds / state.masterPlayerInfo.durationSeconds;

                dispatch(masterPlayerUpdateLoadedTime({
                    loadedSeconds: masterLoadedSeconds,
                    loadedFraction: masterLoadedFraction,
                }));
            }

            break;

        case PLAYER_OFFSET_CHANGED:
            state = getState();

            const maxDurationPlayerId = state.offsets.referencePlayerId;
            if (!maxDurationPlayerId) {
                break;
            }

            const maxDuration = state.playersInfo[maxDurationPlayerId].durationSeconds;

            maxOffsetUnderflow = Object.values(state.offsets.offsets).reduce((acc, offset) => Math.max(acc, offset), 0);
            const maxOffsetOverflow = Object.entries(state.offsets.offsets).reduce((acc, curr) => {
                const [playerId, offset] = curr;
                const playerDuration = state.playersInfo[playerId].durationSeconds;

                return Math.max(acc, playerDuration - offset - maxDuration);
            }, 0);

            dispatch(masterPlayerUpdateDuration(maxOffsetUnderflow + maxDuration + maxOffsetOverflow));
            break;

        case VIDEO_ADDED:
        case VIDEOS_ADDED:
            dispatch(masterPlayerNotReady());
            break;
    }

    next(action);
};

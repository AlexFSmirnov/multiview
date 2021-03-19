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
import { getOffsets, getPlayerOffset } from '../selectors';
import { getPlayerDurationSeconds, getPlayersInfoState } from '../selectors/playersInfo';
import { getMasterPlayerDurationSeconds } from '../selectors/masterPlayerInfo';

const everyOtherPlayer = (condition: (playerInfo: PlayerInfo) => boolean, state: State, currentId: string) => (
    Object.entries(state.playersInfo).every(([id, playerInfo]) => id === currentId || condition(playerInfo))
);

export const masterPlayerMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
    next(action);

    const { dispatch, getState } = store;
    const state = getState();

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
            const masterDurationSeconds = getMasterPlayerDurationSeconds(state);

            if (action.type === PLAYER_PLAYED_TIME_UPDATED || action.type === PLAYER_PROGRESS_UPDATED) {
                const masterPlayedSeconds = Object.entries(getPlayersInfoState(state)).reduce(
                    (acc, curr) => {
                        const [playerId, playerInfo] = curr;
                        const { playedSeconds, hasEnded } = playerInfo;
                        const offset = getPlayerOffset(playerId)(state);

                        if (hasEnded) {
                            return acc;
                        }

                        return Math.min(acc, playedSeconds - offset);
                    },
                    masterDurationSeconds,
                );

                const masterPlayedFraction = masterPlayedSeconds / masterDurationSeconds;

                dispatch(masterPlayerUpdatePlayedTime({
                    playedSeconds: masterPlayedSeconds,
                    playedFraction: masterPlayedFraction,
                }));
            }

            if (action.type === PLAYER_LOADED_TIME_UPDATED || action.type === PLAYER_PROGRESS_UPDATED) {
                const masterLoadedSeconds = Object.entries(getPlayersInfoState(state)).reduce(
                    (acc, curr) => {
                        const [playerId, playerInfo] = curr;
                        const { loadedSeconds, durationSeconds, hasEnded } = playerInfo;
                        const offset = getPlayerOffset(playerId)(state);

                        // If a player is completely loaded, it should not affect the overall loaded time.
                        if (hasEnded || loadedSeconds >= (durationSeconds - 0.01)) {
                            return acc;
                        }

                        return Math.min(acc, loadedSeconds - offset);
                    },
                    masterDurationSeconds,
                );

                const masterLoadedFraction = masterLoadedSeconds / masterDurationSeconds;

                dispatch(masterPlayerUpdateLoadedTime({
                    loadedSeconds: masterLoadedSeconds,
                    loadedFraction: masterLoadedFraction,
                }));
            }

            break;

        case PLAYER_OFFSET_CHANGED:
            const prevMasterPlayerDuration = getMasterPlayerDurationSeconds(state);
            const masterPlayerDuration = Object.entries(getOffsets(state)).reduce(
                (acc, curr) => {
                    const [playerId, offset] = curr;
                    const playerDuration = getPlayerDurationSeconds(playerId)(state);

                    return Math.max(acc, playerDuration - offset);
                },
                0,
            );

            // Account for slight delays in onProgress calls.
            if (Math.abs(masterPlayerDuration - prevMasterPlayerDuration) >= 1) {
                dispatch(masterPlayerUpdateDuration(masterPlayerDuration));
            }

            break;

        case VIDEO_ADDED:
        case VIDEOS_ADDED:
            dispatch(masterPlayerNotReady());
            break;
    }
};

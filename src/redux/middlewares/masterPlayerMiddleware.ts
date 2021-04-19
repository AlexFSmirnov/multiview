import { Middleware } from 'redux';
import {
    Action,
    AppThunkDispatch,
    State,
    VIDEOS_ADDED,
    PLAYER_OFFSET_CHANGED,
    PlayerInfo,
    PLAYER_LOADED_TIME_UPDATED,
    PLAYER_PLAYED_TIME_UPDATED,
    PLAYER_PROGRESS_UPDATED,
    PLAYER_READY,
    PLAYER_STARTED_BUFFERING,
    PLAYER_STARTED_PLAYING,
    PLAYER_STOPPED_BUFFERING,
    PLAYER_STOPPED_PLAYING,
    MASTER_PLAYER_PLAYED_TIME_UPDATED,
} from '../types';
import {
    getOffsets,
    getPlayerOffset,
    getPlayersInfoState,
    getPlayerDurationSeconds,
    getPlayerInfo,
    getMasterPendingSeek,
    getMasterPlayerDurationSeconds,
    getMasterPlayerPlayedSeconds,
} from '../selectors';
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
    masterPlayerRemovePendingSeek,
} from '../actions';

const everyOtherPlayer = (condition: (playerInfo: PlayerInfo) => boolean, state: State, currentId: string) => (
    Object.entries(getPlayersInfoState(state)).every(([id, playerInfo]) => id === currentId || condition(playerInfo))
);

export const masterPlayerMiddleware: Middleware<{}, State, AppThunkDispatch> = store => next => (action: Action) => {
    const { dispatch, getState } = store;

    next(action);
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
            if (!getPlayerInfo(action.payload.id)(state).hasEnded) {
                dispatch(masterPlayerStartBuffering());
            }
            break;

        case PLAYER_STOPPED_BUFFERING:
            if (everyOtherPlayer(player => (!player.isBuffering || player.hasEnded), state, action.payload.id)) {
                dispatch(masterPlayerStopBuffering());
            }
            break;

        case PLAYER_PLAYED_TIME_UPDATED:
        case PLAYER_LOADED_TIME_UPDATED:
        case PLAYER_PROGRESS_UPDATED:
        case PLAYER_OFFSET_CHANGED:
            let masterDurationSeconds = getMasterPlayerDurationSeconds(state);

            if (action.type === PLAYER_OFFSET_CHANGED) {
                const newMasterDurationSeconds = Object.entries(getOffsets(state)).reduce(
                    (acc, curr) => {
                        const [playerId, offset] = curr;
                        const playerDuration = getPlayerDurationSeconds(playerId)(state);

                        return Math.max(acc, playerDuration - offset);
                    },
                    0,
                );

                // Account for slight delays in onProgress calls.
                if (Math.abs(newMasterDurationSeconds - masterDurationSeconds) >= 1) {
                    masterDurationSeconds = newMasterDurationSeconds;
                    dispatch(masterPlayerUpdateDuration(newMasterDurationSeconds));
                }
            }

            if (action.type === PLAYER_PLAYED_TIME_UPDATED || action.type === PLAYER_PROGRESS_UPDATED || action.type === PLAYER_OFFSET_CHANGED) {
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

            if (action.type === PLAYER_LOADED_TIME_UPDATED || action.type === PLAYER_PROGRESS_UPDATED || action.type === PLAYER_OFFSET_CHANGED) {
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

        case MASTER_PLAYER_PLAYED_TIME_UPDATED:
            const pendingSeek = getMasterPendingSeek(state);
            const playedSeconds = getMasterPlayerPlayedSeconds(state);

            if (pendingSeek && Math.abs(playedSeconds - pendingSeek) < 1) {
                dispatch(masterPlayerRemovePendingSeek());
            }

            break;


        case VIDEOS_ADDED:
            dispatch(masterPlayerNotReady());
            break;
    }
};

import { AppThunkAction } from '../types';
import { getPlayerOffset } from '../offsets';
import { getPlayersInfoState, shouldPlayerCurrentlyPlay } from '../playersInfo';
import { playerEndVideo, playerPushPendingSeek, playerRestartVideo, playerStartPlaying, playerStopPlaying } from '../playersInfo';
import { getMasterPlayerInfo } from './selectors';
import {
    MasterPlayerReadyAction,
    MasterPlayerNotReadyAction,
    MasterPlayerStartedPlayingAction,
    MasterPlayerStoppedPlayingAction,
    MasterPlayerStartedBufferingAction,
    MasterPlayerStoppedBufferingAction,
    MasterPlayerEndedAction,
    MasterPlayerDurationUpdatedAction,
    MasterPlayerPlayedTimeUpdatedAction,
    MasterPlayerLoadedTimeUpdatedAction,
    MasterPlayerProgressUpdatedAction,
    MasterPlayerVolumeUpdatedAction,
    MasterPlayerMutedAction,
    MasterPlayerUnmutedAction,
    MasterPlayerPendingSeekSetAction,
    MasterPlayerPendingSeekRemovedAction,
    MASTER_PLAYER_READY,
    MASTER_PLAYER_NOT_READY,
    MASTER_PLAYER_STARTED_PLAYING,
    MASTER_PLAYER_STOPPED_PLAYING,
    MASTER_PLAYER_STARTED_BUFFERING,
    MASTER_PLAYER_STOPPED_BUFFERING,
    MASTER_PLAYER_ENDED,
    MASTER_PLAYER_DURATION_UPDATED,
    MASTER_PLAYER_PLAYED_TIME_UPDATED,
    MASTER_PLAYER_LOADED_TIME_UPDATED,
    MASTER_PLAYER_PROGRESS_UPDATED,
    MASTER_PLAYER_VOLUME_UPDATED,
    MASTER_PLAYER_MUTED,
    MASTER_PLAYER_UNMUTED,
    MASTER_PLAYER_PENDING_SEEK_SET,
    MASTER_PLAYER_PENDING_SEEK_REMOVED,
} from './types';

export const masterPlayerReady = (): MasterPlayerReadyAction => ({
    type: MASTER_PLAYER_READY,
});

export const masterPlayerNotReady = (): MasterPlayerNotReadyAction => ({
    type: MASTER_PLAYER_NOT_READY,
});

export const masterPlayerStartPlaying = (): MasterPlayerStartedPlayingAction => ({
    type: MASTER_PLAYER_STARTED_PLAYING,
});

export const masterPlayerStopPlaying = (): MasterPlayerStoppedPlayingAction => ({
    type: MASTER_PLAYER_STOPPED_PLAYING,
});

export const masterPlayerStartBuffering = (): MasterPlayerStartedBufferingAction => ({
    type: MASTER_PLAYER_STARTED_BUFFERING,
});

export const masterPlayerStopBuffering = (): MasterPlayerStoppedBufferingAction => ({
    type: MASTER_PLAYER_STOPPED_BUFFERING,
});

export const masterPlayerEnd = (): MasterPlayerEndedAction => ({
    type: MASTER_PLAYER_ENDED,
});

export const masterPlayerUpdateDuration = (durationSeconds: number): MasterPlayerDurationUpdatedAction => ({
    type: MASTER_PLAYER_DURATION_UPDATED,
    payload: { durationSeconds },
});

interface PlayedProgress {
    playedSeconds: number;
    playedFraction: number;
}

export const masterPlayerUpdatePlayedTime = ({ playedSeconds, playedFraction }: PlayedProgress): MasterPlayerPlayedTimeUpdatedAction => ({
    type: MASTER_PLAYER_PLAYED_TIME_UPDATED,
    payload: { playedSeconds, playedFraction },
});

interface LoadedProgress {
    loadedSeconds: number;
    loadedFraction: number;
}

export const masterPlayerUpdateLoadedTime = ({ loadedSeconds, loadedFraction }: LoadedProgress): MasterPlayerLoadedTimeUpdatedAction => ({
    type: MASTER_PLAYER_LOADED_TIME_UPDATED,
    payload: { loadedSeconds, loadedFraction },
});

export const masterPlayerUpdateProgress = (progress: PlayedProgress & LoadedProgress): MasterPlayerProgressUpdatedAction => ({
    type: MASTER_PLAYER_PROGRESS_UPDATED,
    payload: { ...progress },
});

export const masterPlayerUpdateVolume = (volume: number): MasterPlayerVolumeUpdatedAction => ({
    type: MASTER_PLAYER_VOLUME_UPDATED,
    payload: { volume },
});

export const masterPlayerMute = (): MasterPlayerMutedAction => ({
    type: MASTER_PLAYER_MUTED,
});

export const masterPlayerUnmute = (): MasterPlayerUnmutedAction => ({
    type: MASTER_PLAYER_UNMUTED,
});

export const masterPlayerSetPendingSeek = (seekToSeconds: number): MasterPlayerPendingSeekSetAction => ({
    type: MASTER_PLAYER_PENDING_SEEK_SET,
    payload: { seekToSeconds },
});

export const masterPlayerRemovePendingSeek = (): MasterPlayerPendingSeekRemovedAction => ({
    type: MASTER_PLAYER_PENDING_SEEK_REMOVED,
});

export const startPlayback = (): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    const {
        isReady: isMasterReady,
        isBuffering: isMasterBuffering,
    } = getMasterPlayerInfo(state);

    if (isMasterReady && !isMasterBuffering) {
        Object.keys(getPlayersInfoState(state)).forEach(id => {
            if (shouldPlayerCurrentlyPlay(id)(state)) {
                dispatch(playerStartPlaying(id));
            }
        });
    }
};

export const stopPlayback = (): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    Object.keys(state.playersInfo).forEach(id => dispatch(playerStopPlaying(id)));
};

export const seekTo = (seconds: number): AppThunkAction => (dispatch, getState) => {
    const state = getState();

    dispatch(masterPlayerSetPendingSeek(seconds));

    Object.entries(getPlayersInfoState(state)).forEach(([playerId, playerInfo]) => {
        const { playedSeconds, durationSeconds } = playerInfo;
        const playerOffset = getPlayerOffset(playerId)(state);

        if (-playerOffset > seconds) {
            if (playedSeconds > 0) {
                dispatch(playerPushPendingSeek(playerId, { seekToSeconds: 0 }));
            }

            dispatch(playerStopPlaying(playerId));
        } else if (seconds >= durationSeconds - playerOffset) {
            if (playedSeconds < durationSeconds) {
                dispatch(playerPushPendingSeek(playerId, { seekToSeconds: durationSeconds }));
            }

            dispatch(playerStopPlaying(playerId));
            dispatch(playerEndVideo(playerId));
        } else {
            const playerPlayedTime = seconds + playerOffset;
            dispatch(playerRestartVideo(playerId));
            dispatch(playerPushPendingSeek(playerId, { seekToSeconds: playerPlayedTime }));

            if (getMasterPlayerInfo(state).isPlaying) {
                dispatch(playerStartPlaying(playerId));
            }
        }
    });
};

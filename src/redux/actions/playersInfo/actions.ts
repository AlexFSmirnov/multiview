import {
    PlayerInitializedAction,
    PlayerReadyAction,
    PlayerStartedPlayingAction,
    PlayerStoppedPlayingAction,
    PlayerStartedBufferingAction,
    PlayerStoppedBufferingAction,
    PlayerVideoEndedAction,
    PlayerVideoRestartedAction,
    PlayerDurationUpdatedAction,
    PlayerPlayedTimeUpdatedAction,
    PlayerLoadedTimeUpdatedAction,
    PlayerProgressUpdatedAction,
    PlayerVolumeUpdatedAction,
    PlayerMutedAction,
    PlayerUnmutedAction,
    PlayerPendingSeekPushedAction,
    PlayerPendingSeekPoppedAction,
    PLAYER_INITIALIZED,
    PLAYER_READY,
    PLAYER_STARTED_PLAYING,
    PLAYER_STOPPED_PLAYING,
    PLAYER_STARTED_BUFFERING,
    PLAYER_STOPPED_BUFFERING,
    PLAYER_VIDEO_ENDED,
    PLAYER_VIDEO_RESTARTED,
    PLAYER_DURATION_UPDATED,
    PLAYER_PLAYED_TIME_UPDATED,
    PLAYER_LOADED_TIME_UPDATED,
    PLAYER_PROGRESS_UPDATED,
    PLAYER_VOLUME_UPDATED,
    PLAYER_MUTED,
    PLAYER_UNMUTED,
    PLAYER_PENDING_SEEK_PUSHED,
    PLAYER_PENDING_SEEK_POPPED,
} from './types';

export const initializePlayer = (id: string): PlayerInitializedAction => ({
    type: PLAYER_INITIALIZED,
    payload: { id },
});

export const playerReady = (id: string): PlayerReadyAction => ({
    type: PLAYER_READY,
    payload: { id },
});

export const playerStartPlaying = (id: string): PlayerStartedPlayingAction => ({
    type: PLAYER_STARTED_PLAYING,
    payload: { id },
});

export const playerStopPlaying = (id: string): PlayerStoppedPlayingAction => ({
    type: PLAYER_STOPPED_PLAYING,
    payload: { id },
});

export const playerStartBuffering = (id: string): PlayerStartedBufferingAction => ({
    type: PLAYER_STARTED_BUFFERING,
    payload: { id },
});

export const playerStopBuffering = (id: string): PlayerStoppedBufferingAction => ({
    type: PLAYER_STOPPED_BUFFERING,
    payload: { id },
});

export const playerEndVideo = (id: string): PlayerVideoEndedAction => ({
    type: PLAYER_VIDEO_ENDED,
    payload: { id },
});

export const playerRestartVideo = (id: string): PlayerVideoRestartedAction => ({
    type: PLAYER_VIDEO_RESTARTED,
    payload: { id },
});

export const playerUpdateDuration = (id: string, { durationSeconds }: { durationSeconds: number }): PlayerDurationUpdatedAction => ({
    type: PLAYER_DURATION_UPDATED,
    payload: { id, durationSeconds },
});

interface PlayedProgress {
    playedSeconds: number;
    playedFraction: number;
}

export const playerUpdatePlayedTime = (id: string, { playedSeconds, playedFraction }: PlayedProgress): PlayerPlayedTimeUpdatedAction => ({
    type: PLAYER_PLAYED_TIME_UPDATED,
    payload: { id, playedSeconds, playedFraction },
});

interface LoadedProgress {
    loadedSeconds: number;
    loadedFraction: number;
}

export const playerUpdateLoadedTime = (id: string, { loadedSeconds, loadedFraction }: LoadedProgress): PlayerLoadedTimeUpdatedAction => ({
    type: PLAYER_LOADED_TIME_UPDATED,
    payload: { id, loadedSeconds, loadedFraction },
});

export const playerUpdateProgress = (id: string, progress: PlayedProgress & LoadedProgress): PlayerProgressUpdatedAction => ({
    type: PLAYER_PROGRESS_UPDATED,
    payload: { id, ...progress },
});

export const playerUpdateVolume = (id: string, { volume }: { volume: number }): PlayerVolumeUpdatedAction => ({
    type: PLAYER_VOLUME_UPDATED,
    payload: { id, volume },
});

export const playerMute = (id: string): PlayerMutedAction => ({
    type: PLAYER_MUTED,
    payload: { id },
});

export const playerUnmute = (id: string): PlayerUnmutedAction => ({
    type: PLAYER_UNMUTED,
    payload: { id },
});

export const playerPushPendingSeek = (id: string, { seekToSeconds }: { seekToSeconds: number }): PlayerPendingSeekPushedAction => ({
    type: PLAYER_PENDING_SEEK_PUSHED,
    payload: { id, seekToSeconds },
});

export const playerPopPendingSeek = (id: string): PlayerPendingSeekPoppedAction => ({
    type: PLAYER_PENDING_SEEK_POPPED,
    payload: { id },
});

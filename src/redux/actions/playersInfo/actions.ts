import {
    PlayerInitializedAction,
    PlayerReadyAction,
    PlayerStartedPlayingAction,
    PlayerStoppedPlayingAction,
    PlayerStartedBufferingAction,
    PlayerStoppedBufferingAction,
    PlayerVideoEndedAction,
    PlayerDurationUpdatedAction,
    PlayerPlayedTimeUpdatedAction,
    PlayerLoadedTimeUpdatedAction,
    PlayerProgressUpdatedAction,
    PlayerVolumeUpdatedAction,
    PLAYER_INITIALIZED,
    PLAYER_READY,
    PLAYER_STARTED_PLAYING,
    PLAYER_STOPPED_PLAYING,
    PLAYER_STARTED_BUFFERING,
    PLAYER_STOPPED_BUFFERING,
    PLAYER_VIDEO_ENDED,
    PLAYER_DURATION_UPDATED,
    PLAYER_PLAYED_TIME_UPDATED,
    PLAYER_LOADED_TIME_UPDATED,
    PLAYER_PROGRESS_UPDATED,
    PLAYER_VOLUME_UPDATED,
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

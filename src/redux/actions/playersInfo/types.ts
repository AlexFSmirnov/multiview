export interface PlayerInfo {
    isReady: boolean;
    isPlaying: boolean;
    isBuffering: boolean;
    hasEnded: boolean;

    durationSeconds: number;
    playedSeconds: number;
    playedFraction: number;
    loadedSeconds: number;
    loadedFraction: number;

    volume: number;

    pendingSeeks: number[];
}

export const PLAYER_INITIALIZED = 'PLAYER_INITIALIZED';
export const PLAYER_READY = 'PLAYER_READY';
export const PLAYER_STARTED_PLAYING = 'PLAYER_STARTED_PLAYING';
export const PLAYER_STOPPED_PLAYING = 'PLAYER_STOPPED_PLAYING';
export const PLAYER_STARTED_BUFFERING = 'PLAYER_STARTED_BUFFERING';
export const PLAYER_STOPPED_BUFFERING = 'PLAYER_STOPPED_BUFFERING';
export const PLAYER_VIDEO_ENDED = 'PLAYER_VIDEO_ENDED';
export const PLAYER_DURATION_UPDATED = 'PLAYER_DURATION_UPDATED';
export const PLAYER_PLAYED_TIME_UPDATED = 'PLAYER_PLAYED_TIME_UPDATED';
export const PLAYER_LOADED_TIME_UPDATED = 'PLAYER_LOADED_TIME_UPDATED';
export const PLAYER_PROGRESS_UPDATED = 'PLAYER_PROGRESS_UPDATED';
export const PLAYER_VOLUME_UPDATED = 'PLAYER_VOLUME_UPDATED';
export const PLAYER_PENDING_SEEK_PUSHED = 'PLAYER_PENDING_SEEK_PUSHED';
export const PLAYER_PENDING_SEEK_POPPED = 'PLAYER_PENDING_SEEK_POPPED';

interface WithId {
    id: string;
}

export interface PlayerInitializedAction {
    type: typeof PLAYER_INITIALIZED;
    payload: WithId;
}

export interface PlayerReadyAction {
    type: typeof PLAYER_READY;
    payload: WithId;
}

export interface PlayerStartedPlayingAction {
    type: typeof PLAYER_STARTED_PLAYING;
    payload: WithId;
}

export interface PlayerStoppedPlayingAction {
    type: typeof PLAYER_STOPPED_PLAYING;
    payload: WithId;
}

export interface PlayerStartedBufferingAction {
    type: typeof PLAYER_STARTED_BUFFERING;
    payload: WithId;
}

export interface PlayerStoppedBufferingAction {
    type: typeof PLAYER_STOPPED_BUFFERING;
    payload: WithId;
}

export interface PlayerVideoEndedAction {
    type: typeof PLAYER_VIDEO_ENDED;
    payload: WithId;
}

export interface PlayerDurationUpdatedAction {
    type: typeof PLAYER_DURATION_UPDATED;
    payload: WithId & {
        durationSeconds: number;
    };
}

export interface PlayerPlayedTimeUpdatedAction {
    type: typeof PLAYER_PLAYED_TIME_UPDATED;
    payload: WithId & {
        playedSeconds: number;
        playedFraction: number;
    };
}

export interface PlayerLoadedTimeUpdatedAction {
    type: typeof PLAYER_LOADED_TIME_UPDATED;
    payload: WithId & {
        loadedSeconds: number;
        loadedFraction: number;
    };
}

export interface PlayerProgressUpdatedAction {
    type: typeof PLAYER_PROGRESS_UPDATED;
    payload: WithId & {
        playedSeconds: number;
        playedFraction: number;
        loadedSeconds: number;
        loadedFraction: number;
    };
}

export interface PlayerVolumeUpdatedAction {
    type: typeof PLAYER_VOLUME_UPDATED;
    payload: WithId & {
        volume: number;
    };
}

export interface PlayerPendingSeekPushedAction {
    type: typeof PLAYER_PENDING_SEEK_PUSHED;
    payload: WithId & {
        seekToSeconds: number;
    };
}

export interface PlayerPendingSeekPoppedAction {
    type: typeof PLAYER_PENDING_SEEK_POPPED;
    payload: WithId;
}

export type PlayersInfoAction = (
    PlayerInitializedAction | PlayerReadyAction | PlayerStartedPlayingAction | PlayerStoppedPlayingAction |
    PlayerStartedBufferingAction | PlayerStoppedBufferingAction | PlayerVideoEndedAction | PlayerDurationUpdatedAction |
    PlayerPlayedTimeUpdatedAction | PlayerLoadedTimeUpdatedAction | PlayerProgressUpdatedAction | PlayerVolumeUpdatedAction |
    PlayerPendingSeekPushedAction | PlayerPendingSeekPoppedAction
);

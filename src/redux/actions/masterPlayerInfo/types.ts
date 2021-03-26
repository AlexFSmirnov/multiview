export const MASTER_PLAYER_READY = 'MASTER_PLAYER_READY';
export const MASTER_PLAYER_NOT_READY = 'MASTER_PLAYER_NOT_READY';
export const MASTER_PLAYER_STARTED_PLAYING = 'MASTER_PLAYER_STARTED_PLAYING';
export const MASTER_PLAYER_STOPPED_PLAYING = 'MASTER_PLAYER_STOPPED_PLAYING';
export const MASTER_PLAYER_STARTED_BUFFERING = 'MASTER_PLAYER_STARTED_BUFFERING';
export const MASTER_PLAYER_STOPPED_BUFFERING = 'MASTER_PLAYER_STOPPED_BUFFERING';
export const MASTER_PLAYER_ENDED = 'MASTER_PLAYER_ENDED';
export const MASTER_PLAYER_DURATION_UPDATED = 'MASTER_PLAYER_DURATION_UPDATED';
export const MASTER_PLAYER_PLAYED_TIME_UPDATED = 'MASTER_PLAYER_PLAYED_TIME_UPDATED';
export const MASTER_PLAYER_LOADED_TIME_UPDATED = 'MASTER_PLAYER_LOADED_TIME_UPDATED';
export const MASTER_PLAYER_PROGRESS_UPDATED = 'MASTER_PLAYER_PROGRESS_UPDATED';
export const MASTER_PLAYER_VOLUME_UPDATED = 'MASTER_PLAYER_VOLUME_UPDATED';
export const MASTER_PLAYER_MUTED = 'MASTER_PLAYER_MUTED';
export const MASTER_PLAYER_UNMUTED = 'MASTER_PLAYER_UNMUTED';
export const MASTER_PLAYER_PENDING_SEEK_SET = 'MASTER_PLAYER_PENDING_SEEK_SET';
export const MASTER_PLAYER_PENDING_SEEK_REMOVED = 'MASTER_PLAYER_PENDING_SEEK_REMOVED';

export interface MasterPlayerReadyAction {
    type: typeof MASTER_PLAYER_READY;
}

export interface MasterPlayerNotReadyAction {
    type: typeof MASTER_PLAYER_NOT_READY;
}

export interface MasterPlayerStartedPlayingAction {
    type: typeof MASTER_PLAYER_STARTED_PLAYING;
}

export interface MasterPlayerStoppedPlayingAction {
    type: typeof MASTER_PLAYER_STOPPED_PLAYING;
}

export interface MasterPlayerStartedBufferingAction {
    type: typeof MASTER_PLAYER_STARTED_BUFFERING;
}

export interface MasterPlayerStoppedBufferingAction {
    type: typeof MASTER_PLAYER_STOPPED_BUFFERING;
}

export interface MasterPlayerEndedAction {
    type: typeof MASTER_PLAYER_ENDED;
}

export interface MasterPlayerDurationUpdatedAction {
    type: typeof MASTER_PLAYER_DURATION_UPDATED;
    payload: {
        durationSeconds: number;
    };
}

export interface MasterPlayerPlayedTimeUpdatedAction {
    type: typeof MASTER_PLAYER_PLAYED_TIME_UPDATED;
    payload: {
        playedSeconds: number;
        playedFraction: number;
    };
}

export interface MasterPlayerLoadedTimeUpdatedAction {
    type: typeof MASTER_PLAYER_LOADED_TIME_UPDATED;
    payload: {
        loadedSeconds: number;
        loadedFraction: number;
    };
}

export interface MasterPlayerProgressUpdatedAction {
    type: typeof MASTER_PLAYER_PROGRESS_UPDATED;
    payload: {
        playedSeconds: number;
        playedFraction: number;
        loadedSeconds: number;
        loadedFraction: number;
    };
}

export interface MasterPlayerVolumeUpdatedAction {
    type: typeof MASTER_PLAYER_VOLUME_UPDATED;
    payload: {
        volume: number;
    };
}

export interface MasterPlayerMutedAction {
    type: typeof MASTER_PLAYER_MUTED;
}

export interface MasterPlayerUnmutedAction {
    type: typeof MASTER_PLAYER_UNMUTED;
}

export interface MasterPlayerPendingSeekSetAction {
    type: typeof MASTER_PLAYER_PENDING_SEEK_SET;
}

export interface MasterPlayerPendingSeekRemovedAction {
    type: typeof MASTER_PLAYER_PENDING_SEEK_REMOVED;
}

export type MasterPlayerInfoAction = (
    MasterPlayerReadyAction | MasterPlayerNotReadyAction | MasterPlayerStartedPlayingAction | MasterPlayerStoppedPlayingAction |
    MasterPlayerStartedBufferingAction | MasterPlayerStoppedBufferingAction | MasterPlayerEndedAction | MasterPlayerDurationUpdatedAction |
    MasterPlayerPlayedTimeUpdatedAction | MasterPlayerLoadedTimeUpdatedAction | MasterPlayerProgressUpdatedAction |
    MasterPlayerVolumeUpdatedAction | MasterPlayerMutedAction | MasterPlayerUnmutedAction | MasterPlayerPendingSeekSetAction | MasterPlayerPendingSeekRemovedAction
);

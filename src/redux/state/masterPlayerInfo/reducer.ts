import {
    MasterPlayerInfoState,
    MasterPlayerInfoAction,
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

const masterPlayerInfoInitialState: MasterPlayerInfoState = {
    isReady: false,
    isPlaying: false,
    isBuffering: false,
    hasEnded: false,
    durationSeconds: 0,
    playedSeconds: 0,
    playedFraction: 0,
    loadedSeconds: 0,
    loadedFraction: 0,
    volume: 1,
    isMuted: false,
    pendingSeek: null,
};

export const masterPlayerInfoReducer = (state = masterPlayerInfoInitialState, action: MasterPlayerInfoAction) => {
    switch (action.type) {
        case MASTER_PLAYER_READY:
            return { ...state, isReady: true };

        case MASTER_PLAYER_NOT_READY:
            return { ...state, isReady: false };

        case MASTER_PLAYER_STARTED_PLAYING:
            return { ...state, isPlaying: true };

        case MASTER_PLAYER_STOPPED_PLAYING:
            return { ...state, isPlaying: false };

        case MASTER_PLAYER_STARTED_BUFFERING:
            return { ...state, isBuffering: true };

        case MASTER_PLAYER_STOPPED_BUFFERING:
            return { ...state, isBuffering: false };

        case MASTER_PLAYER_ENDED:
            return { ...state, hasEnded: true };

        case MASTER_PLAYER_VOLUME_UPDATED:
            return { ...state, isMuted: false, ...action.payload };

        case MASTER_PLAYER_MUTED:
            return { ...state, isMuted: true };

        case MASTER_PLAYER_UNMUTED:
            return { ...state, isMuted: false };

        case MASTER_PLAYER_PENDING_SEEK_SET:
            return { ...state, pendingSeek: action.payload.seekToSeconds };

        case MASTER_PLAYER_PENDING_SEEK_REMOVED:
            return { ...state, pendingSeek: null };

        case MASTER_PLAYER_DURATION_UPDATED:
        case MASTER_PLAYER_PLAYED_TIME_UPDATED:
        case MASTER_PLAYER_LOADED_TIME_UPDATED:
        case MASTER_PLAYER_PROGRESS_UPDATED:
            return { ...state, ...action.payload };

        default:
            return state;
    }
};
import {
    PlayerInfo,
    PlayersInfoState,
    PlayersInfoAction,
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
} from '../types';

export const playersInfoInitialState: PlayersInfoState = {};

export const playerInfoInitialState: PlayerInfo = {
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
    pendingSeeks: [],
};

export const playersInfoReducer = (state = playersInfoInitialState, action: PlayersInfoAction) => {
    switch (action.type) {
        case PLAYER_INITIALIZED:
            return { ...state, [action.payload.id]: { ...playerInfoInitialState } };

        case PLAYER_READY:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isReady: true,
            } };

        case PLAYER_STARTED_PLAYING:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isPlaying: true,
                isBuffering: false,
                hasEnded: false,
            } };

        case PLAYER_STOPPED_PLAYING:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isPlaying: false,
            } };

        case PLAYER_STARTED_BUFFERING:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isBuffering: true,
            } };

        case PLAYER_STOPPED_BUFFERING:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isBuffering: false,
            } };

        case PLAYER_VIDEO_ENDED:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                hasEnded: true,
                isBuffering: false,
            } };

        case PLAYER_VIDEO_RESTARTED:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                hasEnded: false,
            } };

        case PLAYER_DURATION_UPDATED:
            const { durationSeconds } = action.payload;
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                durationSeconds,
            } };

        case PLAYER_PLAYED_TIME_UPDATED:
            const { playedSeconds, playedFraction } = action.payload;
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                playedSeconds,
                playedFraction,
            } };

        case PLAYER_LOADED_TIME_UPDATED:
            const { loadedSeconds, loadedFraction } = action.payload;
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                loadedSeconds,
                loadedFraction,
            } };

        case PLAYER_PROGRESS_UPDATED:
            const { id, ...progress } = action.payload;
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                ...progress,
            } };

        case PLAYER_VOLUME_UPDATED:
            const { volume } = action.payload;
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                volume,
                isMuted: false,
            } };

        case PLAYER_MUTED:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isMuted: true,
            } };

        case PLAYER_UNMUTED:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                isMuted: false,
            } };

        case PLAYER_PENDING_SEEK_PUSHED:
            const { seekToSeconds } = action.payload;
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                pendingSeeks: [
                    ...state[action.payload.id].pendingSeeks,
                    seekToSeconds,
                ],
            } };

        case PLAYER_PENDING_SEEK_POPPED:
            return { ...state, [action.payload.id]: {
                ...state[action.payload.id],
                pendingSeeks: [
                    ...state[action.payload.id].pendingSeeks.slice(1),
                ],
            } };

        default:
            return state;
    }
};

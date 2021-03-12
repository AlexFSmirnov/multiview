import { Middleware } from 'redux';
import { Action, State } from '../types';
import { VIDEOS_ADDED, VIDEO_ADDED } from '../actions/videos';
import {
    PlayerInfo,
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
} from '../actions/masterPlayerInfo';

const everyOtherPlayer = (condition: (playerInfo: PlayerInfo) => boolean, state: State, currentId: string) => (
    Object.entries(state.playersInfo).every(([id, playerInfo]) => id === currentId || condition(playerInfo))
);

export const masterPlayerMiddleware: Middleware<{}, State> = store => next => (action: Action) => {
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

        case VIDEO_ADDED:
        case VIDEOS_ADDED:
            dispatch(masterPlayerNotReady());
            break;
    }

    next(action);
};

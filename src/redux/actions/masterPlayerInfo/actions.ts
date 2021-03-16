import { AppThunkAction } from '../../types';
import { playerStartPlaying, playerStopPlaying } from '../playersInfo';
import {
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

export const startPlayback = (): AppThunkAction => (dispatch, getState) => {
    const state = getState();
    Object.keys(state.playersInfo).forEach(id => dispatch(playerStartPlaying(id)));
};

export const stopPlayback = (): AppThunkAction => (dispatch, getState) => {
    const state = getState();
    Object.keys(state.playersInfo).forEach(id => dispatch(playerStopPlaying(id)));
};

import { MasterPlayerInfoAction } from '../actions/masterPlayerInfo';

export interface MasterPlayerInfoState {
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
}
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
};

export const masterPlayerInfoReducer = (state = masterPlayerInfoInitialState, action: MasterPlayerInfoAction) => {
    return state;
};
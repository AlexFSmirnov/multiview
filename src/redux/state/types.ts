import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { MasterPlayerInfoAction, MasterPlayerInfoState } from './masterPlayerInfo';
import { PlayersInfoAction, PlayersInfoState } from './playersInfo';
import { OffsetsAction, OffsetsState } from './offsets';
import { SettingsAction, SettingsState } from './settings';
import { VideosAction, VideosState } from './videos';

export interface State {
    masterPlayerInfo: MasterPlayerInfoState;
    playersInfo: PlayersInfoState;
    offsets: OffsetsState;
    settings: SettingsState;
    videos: VideosState;
}

export type Action = MasterPlayerInfoAction | PlayersInfoAction | OffsetsAction | VideosAction | SettingsAction;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppThunkDispatch = ThunkDispatch<State, {}, Action>;

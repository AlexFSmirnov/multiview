import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { MasterPlayerInfoAction, MasterPlayerInfoState } from './masterPlayerInfo/types';
import { PlayersInfoAction, PlayersInfoState } from './playersInfo/types';
import { OffsetsAction, OffsetsState } from './offsets/types';
import { SettingsAction, SettingsState } from './settings/types';
import { VideosAction, VideosState } from './videos/types';

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

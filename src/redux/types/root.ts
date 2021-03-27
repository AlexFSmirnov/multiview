import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { MasterPlayerInfoAction, MasterPlayerInfoState } from './masterPlayerInfo';
import { PlayersInfoAction, PlayersInfoState } from './playersInfo';
import { OffsetsAction, OffsetsState } from './offsets';
import { VideosAction, VideosState } from './videos';

export interface State {
    masterPlayerInfo: MasterPlayerInfoState;
    playersInfo: PlayersInfoState;
    offsets: OffsetsState;
    videos: VideosState;
}

export type Action = AnyAction & (MasterPlayerInfoAction | PlayersInfoAction | OffsetsAction | VideosAction);

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppAsyncThunkAction<R = void> = AppThunkAction<Promise<R>>;

export type AppThunkDispatch = ThunkDispatch<State, {}, Action>;

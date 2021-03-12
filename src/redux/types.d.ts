import { ThunkAction } from 'redux-thunk';
import { MasterPlayerInfoAction } from './actions/masterPlayerInfo';
import { MasterPlayerInfoState } from './reducers/masterPlayerInfo';
import { PlayersInfoAction } from './actions/playersInfo';
import { PlayersInfoState } from './reducers/playersInfo';
import { VideosAction } from './actions/videos';
import { VideosState } from './reducers/videos';

export interface State {
    masterPlayerInfo: MasterPlayerInfoState;
    playersInfo: PlayersInfoState;
    videos: VideosState;
}

export type Action = MasterPlayerInfoAction | PlayersInfoAction | VideosAction;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppAsyncThunkAction<R = void> = AppThunkAction<Promise<R>>;

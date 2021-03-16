import { ThunkAction } from 'redux-thunk';
import { MasterPlayerInfoAction } from './actions/masterPlayerInfo';
import { MasterPlayerInfoState } from './reducers/masterPlayerInfo';
import { PlayersInfoAction } from './actions/playersInfo';
import { PlayersInfoState } from './reducers/playersInfo';
import { OffsetsAction } from './actions/offsets';
import { OffsetsState } from './reducers/offsets';
import { VideosAction } from './actions/videos';
import { VideosState } from './reducers/videos';

export interface State {
    masterPlayerInfo: MasterPlayerInfoState;
    playersInfo: PlayersInfoState;
    offsets: OffsetsState;
    videos: VideosState;
}

export type Action = MasterPlayerInfoAction | PlayersInfoAction | OffsetsAction | VideosAction;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppAsyncThunkAction<R = void> = AppThunkAction<Promise<R>>;

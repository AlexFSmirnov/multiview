import { ThunkAction } from 'redux-thunk';
import { Video, VideosAction } from './actions/videos';

export interface State {
    videos: Record<string, Video>;
}

export type Action = VideosAction;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppAsyncThunkAction<R = void> = AppThunkAction<Promise<R>>;

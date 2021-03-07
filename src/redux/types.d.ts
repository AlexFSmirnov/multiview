import { ThunkAction } from 'redux-thunk';

// export interface State {
//     test: any;
// }
export type State = any;

export type Action = any;

export type AppThunkAction<R = void> = ThunkAction<R, State, {}, Action>;
export type AppAsyncThunkAction<R = void> = AppThunkAction<Promise<R>>;

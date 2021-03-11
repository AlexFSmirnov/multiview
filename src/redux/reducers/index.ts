import { combineReducers } from 'redux';
import { playersInfoReducer } from './playersInfo';
import { videosReducer } from './videos';

export const rootReducer = combineReducers({
    playersInfo: playersInfoReducer,
    videos: videosReducer,
});

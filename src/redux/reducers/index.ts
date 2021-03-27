import { combineReducers } from 'redux';
import { masterPlayerInfoReducer } from './masterPlayerInfo';
import { playersInfoReducer } from './playersInfo';
import { offsetsReducer } from './offsets';
import { settingsReducer } from './settings';
import { videosReducer } from './videos';

export const rootReducer = combineReducers({
    masterPlayerInfo: masterPlayerInfoReducer,
    playersInfo: playersInfoReducer,
    offsets: offsetsReducer,
    settings: settingsReducer,
    videos: videosReducer,
});

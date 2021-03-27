import { combineReducers } from 'redux';
import { masterPlayerInfoReducer } from './masterPlayerInfo';
import { offsetsReducer } from './offsets';
import { playersInfoReducer } from './playersInfo';
import { settingsReducer } from './settings';
import { videosReducer } from './videos';

export const rootReducer = combineReducers({
    masterPlayerInfo: masterPlayerInfoReducer,
    offsets: offsetsReducer,
    playersInfo: playersInfoReducer,
    settings: settingsReducer,
    videos: videosReducer,
});

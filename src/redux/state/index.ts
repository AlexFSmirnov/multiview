import { combineReducers } from 'redux';
import { masterPlayerInfoReducer } from './masterPlayerInfo/reducer';
import { offsetsReducer } from './offsets/reducer';
import { playersInfoReducer } from './playersInfo/reducer';
import { settingsReducer } from './settings/reducer';
import { videosReducer } from './videos/reducer';

export const rootReducer = combineReducers({
    masterPlayerInfo: masterPlayerInfoReducer,
    offsets: offsetsReducer,
    playersInfo: playersInfoReducer,
    settings: settingsReducer,
    videos: videosReducer,
});

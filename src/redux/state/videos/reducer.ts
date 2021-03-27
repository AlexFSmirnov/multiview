import { omit } from 'lodash/fp';
import { v4 as uuidv4 } from 'uuid';
import { VideosState, VideosAction, VIDEO_ADDED, VIDEOS_ADDED, VIDEO_REMOVED } from './types';

const videosInitialState: VideosState = {};

export const videosReducer = (state = videosInitialState, action: VideosAction) => {
    switch (action.type) {
        case VIDEO_ADDED:
            return { ...state, [uuidv4()]: action.payload };

        case VIDEOS_ADDED:
            return { ...state, ...action.payload };

        case VIDEO_REMOVED:
            return omit(action.payload.id, state);
        
        default:
            return state;
    }
};
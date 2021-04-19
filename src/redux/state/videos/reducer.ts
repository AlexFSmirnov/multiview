import { omit } from 'lodash/fp';
import { VideosState, VideosAction, VIDEOS_ADDED, VIDEO_REMOVED } from './types';

const videosInitialState: VideosState = {};

export const videosReducer = (state = videosInitialState, action: VideosAction) => {
    switch (action.type) {
        case VIDEOS_ADDED:
            return { ...state, ...action.payload };

        case VIDEO_REMOVED:
            return omit(action.payload.id, state);
        
        default:
            return state;
    }
};

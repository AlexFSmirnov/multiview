import { omit } from 'lodash/fp';
import { VideosState, VideosAction, VIDEOS_ADDED, VIDEO_DELETED } from './types';

const videosInitialState: VideosState = {};

export const videosReducer = (state = videosInitialState, action: VideosAction) => {
    switch (action.type) {
        case VIDEOS_ADDED:
            return { ...state, ...action.payload };

        case VIDEO_DELETED:
            return omit(action.payload.id, state);
        
        default:
            return state;
    }
};

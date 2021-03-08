import { omit } from 'lodash/fp';
import { v4 as uuidv4 } from 'uuid';
import { Video, VideosAction, VIDEO_ADDED, VIDEO_REMOVED } from '../actions/videos';

export type VideosState = Record<string, Video>;
const videosInitialState: VideosState = {};

export const videosReducer = (state = videosInitialState, action: VideosAction) => {
    switch (action.type) {
        case VIDEO_ADDED:
            return { ...state, [uuidv4()]: action.payload };

        case VIDEO_REMOVED:
            return omit(action.payload.id, state);
        
        default:
            return state;
    }
};

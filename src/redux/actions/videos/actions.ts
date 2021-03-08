import { VideoAddedAction, VideoRemovedAction, VIDEO_ADDED, VIDEO_REMOVED} from './types';

export const addVideo = (url: string): VideoAddedAction => ({
    type: VIDEO_ADDED,
    payload: { url },
});

export const removeVideo = (id: string): VideoRemovedAction => ({
    type: VIDEO_REMOVED,
    payload: { id },
});

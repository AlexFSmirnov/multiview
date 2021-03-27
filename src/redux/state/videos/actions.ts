import { Video, VideoAddedAction, VideosAddedAction, VideoRemovedAction, VIDEO_ADDED, VIDEOS_ADDED, VIDEO_REMOVED} from './types';

export const addVideo = (url: string): VideoAddedAction => ({
    type: VIDEO_ADDED,
    payload: { url },
});

export const addVideos = (videos: Record<string, Video>): VideosAddedAction => ({
    type: VIDEOS_ADDED,
    payload: videos,
});

export const removeVideo = (id: string): VideoRemovedAction => ({
    type: VIDEO_REMOVED,
    payload: { id },
});

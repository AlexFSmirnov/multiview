import { Video, VideosAddedAction, VideoRemovedAction, VIDEOS_ADDED, VIDEO_REMOVED} from './types';

export const addVideos = (videos: Record<string, Video>): VideosAddedAction => ({
    type: VIDEOS_ADDED,
    payload: videos,
});

export const removeVideo = (id: string): VideoRemovedAction => ({
    type: VIDEO_REMOVED,
    payload: { id },
});

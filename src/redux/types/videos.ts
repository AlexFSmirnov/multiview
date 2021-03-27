export interface Video {
    url: string;
}

export type VideosState = Record<string, Video>;

export const VIDEO_ADDED = 'VIDEO_ADDED';
export const VIDEOS_ADDED = 'VIDEOS_ADDED';
export const VIDEO_REMOVED = 'VIDEO_REMOVED';

export interface VideoAddedAction {
    type: typeof VIDEO_ADDED;
    payload: Video;
}

export interface VideosAddedAction {
    type: typeof VIDEOS_ADDED;
    payload: Record<string, Video>;
}

export interface VideoRemovedAction {
    type: typeof VIDEO_REMOVED;
    payload: {
        id: string;
    };
}

export type VideosAction = VideoAddedAction | VideosAddedAction | VideoRemovedAction;

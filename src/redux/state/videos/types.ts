export interface Video {
    url: string;
}

export type VideosState = Record<string, Video>;

export const VIDEOS_ADDED = 'VIDEOS_ADDED';
export const VIDEO_REMOVED = 'VIDEO_REMOVED';

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

export type VideosAction = VideosAddedAction | VideoRemovedAction;

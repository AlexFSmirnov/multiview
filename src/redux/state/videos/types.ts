export interface Video {
    url: string;
}

export type VideosState = Record<string, Video>;

export const VIDEOS_ADDED = 'VIDEOS_ADDED';
export const VIDEO_DELETED = 'VIDEO_DELETED';

export interface VideosAddedAction {
    type: typeof VIDEOS_ADDED;
    payload: Record<string, Video>;
}

export interface VideoRemovedAction {
    type: typeof VIDEO_DELETED;
    payload: {
        id: string;
    };
}

export type VideosAction = VideosAddedAction | VideoRemovedAction;

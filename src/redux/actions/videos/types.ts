export interface Video {
    url: string;
}

export const VIDEO_ADDED = 'VIDEO_ADDED';
export const VIDEO_REMOVED = 'VIDEO_REMOVED';

export interface VideoAddedAction {
    type: typeof VIDEO_ADDED;
    payload: Video;
}

export interface VideoRemovedAction {
    type: typeof VIDEO_REMOVED;
    payload: {
        id: string;
    };
}

export type VideosAction = VideoAddedAction | VideoRemovedAction;

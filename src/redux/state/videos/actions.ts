import { AppThunkAction } from '../types';
import { deletePlayer } from '../playersInfo/actions';
import { Video, VideosAddedAction, VideoRemovedAction, VIDEOS_ADDED, VIDEO_DELETED} from './types';

export const addVideos = (videos: Record<string, Video>): VideosAddedAction => ({
    type: VIDEOS_ADDED,
    payload: videos,
});

export const deleteVideo = (id: string): VideoRemovedAction => ({
    type: VIDEO_DELETED,
    payload: { id },
});

export const removeVideo = (id: string): AppThunkAction => dispatch => {
    dispatch(deleteVideo(id));
    dispatch(deletePlayer(id));
};

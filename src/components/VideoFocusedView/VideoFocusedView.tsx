import { Video } from '../../redux/types';

interface VideoFocusedViewProps {
    videos: Record<string, Video>;
}

const VideoFocusedView: React.FC<VideoFocusedViewProps> = ({ videos }) => {

    return (
        <p>I'm a tree view</p>
    );
};

export default VideoFocusedView;

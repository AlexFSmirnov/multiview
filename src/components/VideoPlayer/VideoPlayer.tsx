import ReactPlayer from 'react-player';
import { Video } from '../../redux/actions/videos';

interface VideoPlayerProps {
    video: Video;
    width: number;
    height: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, width, height }) => {
    const playerProps = {
        url: video.url,
        controls: true,
        width,
        height,
        config: {
            youtube: {
                playerVars: {
                    disablekb: 1,
                },
            },
        },
    };

    return (
        <ReactPlayer {...playerProps} />
    );
};

export default VideoPlayer;

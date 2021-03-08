import ReactPlayer from 'react-player';
import { Button } from '@material-ui/core';

interface VideoPlayerProps {
    width: number;
    height: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ width, height }) => {
    const playerProps = {
        url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU',
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
        // <div style={{ width, height, minWidth: width, minHeight: height, backgroundColor: 'white', border: '1px solid red' }} />
    );
};

export default VideoPlayer;

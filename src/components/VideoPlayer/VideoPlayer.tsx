import ReactPlayer from 'react-player';

interface VideoPlayerProps {

}

const VideoPlayer: React.FC<VideoPlayerProps> = ({}) => {
    const playerProps = {
        url: 'https://www.youtube.com/watch?v=ODY6JWzS8WU',
        controls: true,
        playing: true,
        width: 900,
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

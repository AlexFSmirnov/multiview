import { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { Video } from '../../redux/actions/videos';
import {
    initializePlayer,
    playerReady,
    playerStartPlaying,
    playerStopPlaying,
    playerStartBuffering,
    playerStopBuffering,
    playerEndVideo,
    playerUpdateDuration,
    playerUpdatePlayedTime,
    playerUpdateLoadedTime,
    playerUpdateVolume,
} from '../../redux/actions/playersInfo';

interface OwnProps {
    id: string;
    video: Video;
    width: number;
    height: number;
}

interface DispatchProps {
    initializePlayer: typeof initializePlayer;
    playerReady: typeof playerReady;
    playerStartPlaying: typeof playerStartPlaying;
    playerStopPlaying: typeof playerStopPlaying;
    playerStartBuffering: typeof playerStartBuffering;
    playerStopBuffering: typeof playerStopBuffering;
    playerEndVideo: typeof playerEndVideo;
    playerUpdateDuration: typeof playerUpdateDuration;
    playerUpdatePlayedTime: typeof playerUpdatePlayedTime;
    playerUpdateLoadedTime: typeof playerUpdateLoadedTime;
    playerUpdateVolume: typeof playerUpdateVolume;
}

type VideoPlayerProps = OwnProps & DispatchProps;

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    id,
    video,
    width,
    height,
    initializePlayer,
    playerReady,
    playerStartPlaying,
    playerStopPlaying,
    playerStartBuffering,
    playerStopBuffering,
    playerEndVideo,
    playerUpdateDuration,
    playerUpdatePlayedTime,
    playerUpdateLoadedTime,
    playerUpdateVolume,
}) => {
    useEffect(() => {
        initializePlayer(id);
    }, [id, initializePlayer]);

    const handlePlayerReady = () => playerReady(id);

    const handlePlayerPlay = () => {
        playerStartPlaying(id);
        playerStopBuffering(id);
    };

    const handlePlayerPause = () => playerStopPlaying(id);

    const handlePlayerBuffer = () => {
        playerStartBuffering(id);
        playerStopPlaying(id);
    };

    const handlePlayerEnded = () => playerEndVideo(id);

    const handlePlayerDuration = (durationSeconds: number) => playerUpdateDuration(id, { durationSeconds });

    const handlePlayerProgress = ({ played, loaded, playedSeconds, loadedSeconds }: { played: number; loaded: number; playedSeconds: number; loadedSeconds: number }) => {
        playerUpdatePlayedTime(id, { playedSeconds, playedFraction: played });
        playerUpdateLoadedTime(id, { loadedSeconds, loadedFraction: loaded });
    };

    const playerProps = {
        url: video.url,
        controls: true,
        width,
        height,
        onReady: handlePlayerReady,
        onPlay: handlePlayerPlay,
        onPause: handlePlayerPause,
        onBuffer: handlePlayerBuffer,
        onEnded: handlePlayerEnded,
        onDuration: handlePlayerDuration,
        onProgress: handlePlayerProgress,
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

export default connect(
    null,
    {
        initializePlayer,
        playerReady,
        playerStartPlaying,
        playerStopPlaying,
        playerStartBuffering,
        playerStopBuffering,
        playerEndVideo,
        playerUpdateDuration,
        playerUpdatePlayedTime,
        playerUpdateLoadedTime,
        playerUpdateVolume,
    },
)(VideoPlayer);

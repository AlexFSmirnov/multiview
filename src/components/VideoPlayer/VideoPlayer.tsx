import { useRef, useEffect } from 'react';
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
    playerUpdateProgress,
    playerUpdateVolume,
    playerPopPendingSeek,
} from '../../redux/actions/playersInfo';
import { State } from '../../redux/types';

interface OwnProps {
    id: string;
    video: Video;
    width: number;
    height: number;
}

interface StateProps {
    isPlaying: boolean;
    isBuffering: boolean;
    isMasterBuffering: boolean;
    pendingSeeks: number[];
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
    playerUpdateProgress: typeof playerUpdateProgress;
    playerUpdateVolume: typeof playerUpdateVolume;
    playerPopPendingSeek: typeof playerPopPendingSeek;
}

type VideoPlayerProps = OwnProps & StateProps & DispatchProps;

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    id,
    video,
    width,
    height,
    isPlaying,
    isBuffering,
    isMasterBuffering,
    pendingSeeks,
    initializePlayer,
    playerReady,
    playerStartPlaying,
    playerStopPlaying,
    playerStartBuffering,
    playerStopBuffering,
    playerEndVideo,
    playerUpdateDuration,
    playerUpdateProgress,
    playerUpdateVolume,
    playerPopPendingSeek,
}) => {
    const playerRef = useRef<ReactPlayer | null>(null);

    useEffect(() => {
        initializePlayer(id);
    }, [id, initializePlayer]);

    useEffect(() => {
        const { current: player } = playerRef;

        if (pendingSeeks.length > 0 && player) {
            player.seekTo(pendingSeeks[0], 'seconds');
            playerStartBuffering(id);
            playerPopPendingSeek(id);
        }
    }, [id, pendingSeeks, playerStartBuffering, playerPopPendingSeek]);

    const handlePlayerBuffer = () => playerStartBuffering(id);
    const handlePlayerBufferEnd = () => playerStopBuffering(id);
    const handlePlayerEnded = () => playerEndVideo(id);

    const handlePlayerReady = () => {
        playerReady(id);
        playerStopBuffering(id);
    };

    const handlePlayerPlay = () => {
        playerStartPlaying(id);
        playerStopBuffering(id);
    };

    const handlePlayerPause = () => {
        if (!isMasterBuffering) {
            playerStopPlaying(id);
        }
    };

    const handlePlayerDuration = (durationSeconds: number) => playerUpdateDuration(id, { durationSeconds });

    const handlePlayerProgress = ({ played, loaded, playedSeconds, loadedSeconds }: { played: number; loaded: number; playedSeconds: number; loadedSeconds: number }) => {
        playerUpdateProgress(id, { playedSeconds, playedFraction: played, loadedSeconds, loadedFraction: loaded });

        if (!isBuffering && loadedSeconds < playedSeconds) {
            playerStartBuffering(id);
        }

        if (isBuffering && loadedSeconds >= playedSeconds) {
            playerStopBuffering(id);
        }
    };

    const playerProps = {
        url: video.url,
        ref: playerRef,
        controls: true,
        width,
        height,
        playing: isPlaying && !isMasterBuffering,
        onReady: handlePlayerReady,
        onPlay: handlePlayerPlay,
        onPause: handlePlayerPause,
        onBuffer: handlePlayerBuffer,
        onBufferEnd: handlePlayerBufferEnd,
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
        <ReactPlayer {...playerProps}/>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state, ownProps) => ({
        isPlaying: state.playersInfo[ownProps.id] ? state.playersInfo[ownProps.id].isPlaying : false,
        isBuffering: state.playersInfo[ownProps.id] ? state.playersInfo[ownProps.id].isBuffering : false,
        isMasterBuffering: state.masterPlayerInfo.isBuffering,
        pendingSeeks: state.playersInfo[ownProps.id] ? state.playersInfo[ownProps.id].pendingSeeks : [],
    }),
    {
        initializePlayer,
        playerReady,
        playerStartPlaying,
        playerStopPlaying,
        playerStartBuffering,
        playerStopBuffering,
        playerEndVideo,
        playerUpdateDuration,
        playerUpdateProgress,
        playerUpdateVolume,
        playerPopPendingSeek,
    },
)(VideoPlayer);

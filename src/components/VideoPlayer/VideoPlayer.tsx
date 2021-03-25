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
    playerPopPendingSeek,
} from '../../redux/actions/playersInfo';
import { getIsPlayerPlaying, getIsPlayerBuffering, getPlayerVolume, getPlayerPendingSeeks } from '../../redux/selectors/playersInfo';
import { State } from '../../redux/types';
import { ReactPlayerWrapper, VideoPlayerContainer } from './style';
import { PlayerControlOverlay } from '../PlayerControlOverlay';
import { getIsMasterPlayerBuffering } from '../../redux/selectors/masterPlayerInfo';

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
    volume: number;
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
    volume,
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
    };

    const handlePlayerPlay = () => {
        playerStartPlaying(id);
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
        controls: false,
        width,
        height,
        volume,
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
        <VideoPlayerContainer width={width} height={height}>
            <ReactPlayerWrapper>
                <ReactPlayer {...playerProps}/>
            </ReactPlayerWrapper>
            <PlayerControlOverlay id={id} />
        </VideoPlayerContainer>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state, { id }) => ({
        isPlaying: getIsPlayerPlaying(id)(state),
        isBuffering: getIsPlayerBuffering(id)(state),
        volume: getPlayerVolume(id)(state),
        isMasterBuffering: getIsMasterPlayerBuffering(state),
        pendingSeeks: getPlayerPendingSeeks(id)(state),
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
        playerPopPendingSeek,
    },
)(VideoPlayer);

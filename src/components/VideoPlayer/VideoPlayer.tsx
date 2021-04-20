import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { State, Video } from '../../redux/types';
import {
    getIsPlayerPlaying,
    getPlayerVolume,
    getPlayerPendingSeeks,
    getIsPlayerMuted,
    getIsMasterPlayerBuffering,
    getIsMasterPlayerMuted,
    getMasterPlayerVolume,
} from '../../redux/selectors';
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
} from '../../redux/actions';
import { PlayerControlOverlay } from '../PlayerControlOverlay';
import { ReactPlayerWrapper, VideoPlayerContainer } from './style';

interface OwnProps {
    id: string;
    video: Video;
    width: number;
    height: number;
    shadow?: boolean;
}

interface StateProps {
    isPlaying: boolean;
    isMasterBuffering: boolean;
    volume: number;
    masterVolume: number;
    isPlayerMuted: boolean;
    isMasterMuted: boolean;
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
    shadow,
    isPlaying,
    isMasterBuffering,
    volume,
    masterVolume,
    isPlayerMuted,
    isMasterMuted,
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

        if (loadedSeconds < playedSeconds) {
            playerStartBuffering(id);
        }

        if (loadedSeconds >= playedSeconds) {
            playerStopBuffering(id);
        }
    };

    const isMuted = isPlayerMuted || isMasterMuted;

    const playerProps = {
        url: video.url,
        ref: playerRef,
        controls: false,
        width,
        height,
        volume: isMuted ? 0 : (volume * masterVolume),
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

    const color = useRef<string>(`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`);

    return (
        <VideoPlayerContainer width={width} height={height} shadow={shadow}>
            <ReactPlayerWrapper>
                <ReactPlayer {...playerProps}/>
                {/* <div style={{ width, height, backgroundColor: color.current }} /> */}
            </ReactPlayerWrapper>
            <PlayerControlOverlay id={id} width={width} height={height} />
        </VideoPlayerContainer>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state, { id }) => ({
        isPlaying: getIsPlayerPlaying(id)(state),
        isMasterBuffering: getIsMasterPlayerBuffering(state),
        volume: getPlayerVolume(id)(state),
        masterVolume: getMasterPlayerVolume(state),
        isPlayerMuted: getIsPlayerMuted(id)(state),
        isMasterMuted: getIsMasterPlayerMuted(state),
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

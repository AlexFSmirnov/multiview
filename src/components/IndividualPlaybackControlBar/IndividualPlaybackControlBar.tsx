import { connect } from 'react-redux';
import { State } from '../../redux/types';
import {
    getIsPlayerPlaying,
    getIsPlayerBuffering,
    getPlayerDurationSeconds,
    getPlayerVolume,
    getPlayerPlayedFraction,
    getPlayerLoadedFraction,
    getIsPlayerMuted,
} from '../../redux/selectors';
import {
    playerStartPlaying,
    playerStopPlaying,
    playerUpdateVolume,
    playerMute,
    playerUnmute,
    playerPushPendingSeek,
    playerStartBuffering,
} from '../../redux/actions';
import { PlaybackControlBar } from '../PlaybackControlBar';
import IndividualPlaybackControlBarActions from './IndividualPlaybackControlBarActions';

interface OwnProps {
    id: string;
}

interface StateProps {
    isPlaying: boolean;
    isBuffering: boolean;
    isMuted: boolean;
    volume: number;
    durationSeconds: number;
    playedFraction: number;
    loadedFraction: number;
}

interface DispatchProps {
    playerStartPlaying: (id: string) => void;
    playerStopPlaying: (id: string) => void;
    playerUpdateVolume: (id: string, { volume }: { volume: number }) => void;
    playerMute: (id: string) => void;
    playerUnmute: (id: string) => void;
    playerPushPendingSeek: (id: string, { seekToSeconds }: { seekToSeconds: number }) => void;
    playerStartBuffering: (id: string) => void;
}

export type IndividualPlaybackControlBarProps = OwnProps & StateProps & DispatchProps;

const IndividualPlaybackControlBar: React.FC<IndividualPlaybackControlBarProps> = ({
    id,
    isMuted,
    playerStartPlaying,
    playerStopPlaying,
    playerUpdateVolume,
    playerMute,
    playerUnmute,
    playerPushPendingSeek,
    playerStartBuffering,
    ...other
}) => {
    const handleMuteUnmute = () => {
        if (isMuted) {
            playerUnmute(id);
        } else {
            playerMute(id);
        }
    };

    const handleSeek = (seekToSeconds: number) => {
        playerStartBuffering(id);
        playerPushPendingSeek(id, { seekToSeconds });
    };

    const playbackControlBarProps = {
        isMuted,
        onPlay: () => playerStartPlaying(id),
        onPause: () => playerStopPlaying(id),
        onMuteUnmute: handleMuteUnmute,
        onVolumeChange: (volume: number) => playerUpdateVolume(id, { volume }),
        onSeek: handleSeek,

        actions: <IndividualPlaybackControlBarActions />,

        ...other,
    };

    return <PlaybackControlBar {...playbackControlBarProps} />
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state, { id }) => ({
        isPlaying: getIsPlayerPlaying(id)(state),
        isBuffering: getIsPlayerBuffering(id)(state),
        isMuted: getIsPlayerMuted(id)(state),
        volume: getPlayerVolume(id)(state),
        durationSeconds: getPlayerDurationSeconds(id)(state),
        playedFraction: getPlayerPlayedFraction(id)(state),
        loadedFraction: getPlayerLoadedFraction(id)(state),
    }),
    {
        playerStartPlaying,
        playerStopPlaying,
        playerUpdateVolume,
        playerMute,
        playerUnmute,
        playerPushPendingSeek,
        playerStartBuffering,
    },
)(IndividualPlaybackControlBar);
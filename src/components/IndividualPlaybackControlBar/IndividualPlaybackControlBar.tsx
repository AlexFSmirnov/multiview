import { connect } from 'react-redux';
import { playerStartPlaying, playerStopPlaying, playerUpdateVolume, playerPushPendingSeek } from '../../redux/actions/playersInfo';
import { getIsPlayerPlaying, getIsPlayerBuffering, getPlayerDurationSeconds, getPlayerVolume, getPlayerPlayedFraction, getPlayerLoadedFraction } from '../../redux/selectors/playersInfo';
import { State } from '../../redux/types';
import { PlaybackControlBar } from '../PlaybackControlBar';
import IndividualPlaybackControlBarActions from './IndividualPlaybackControlBarActions';

interface OwnProps {
    id: string;
}

interface StateProps {
    isPlaying: boolean;
    isBuffering: boolean;
    volume: number;
    durationSeconds: number;
    playedFraction: number;
    loadedFraction: number;
}

interface DispatchProps {
    playerStartPlaying: (id: string) => void;
    playerStopPlaying: (id: string) => void;
    playerUpdateVolume: (id: string, { volume }: { volume: number }) => void;
    playerPushPendingSeek: (id: string, { seekToSeconds }: { seekToSeconds: number }) => void;
}

export type IndividualPlaybackControlBarProps = OwnProps & StateProps & DispatchProps;

const IndividualPlaybackControlBar: React.FC<IndividualPlaybackControlBarProps> = ({
    id,
    playerStartPlaying,
    playerStopPlaying,
    playerUpdateVolume,
    playerPushPendingSeek,
    ...other
}) => {
    const playbackControlBarProps = {
        ...other,
        onPlay: () => playerStartPlaying(id),
        onPause: () => playerStopPlaying(id),
        // TODO: implement video muting.
        onMuteUnmute: () => {},
        onVolumeChange: (volume: number) => playerUpdateVolume(id, { volume }),
        onSeek: (seekToSeconds: number) => playerPushPendingSeek(id, { seekToSeconds }),

        actions: <IndividualPlaybackControlBarActions />
    };

    return <PlaybackControlBar {...playbackControlBarProps} />
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state, { id }) => ({
        isPlaying: getIsPlayerPlaying(id)(state),
        isBuffering: getIsPlayerBuffering(id)(state),
        volume: getPlayerVolume(id)(state),
        durationSeconds: getPlayerDurationSeconds(id)(state),
        playedFraction: getPlayerPlayedFraction(id)(state),
        loadedFraction: getPlayerLoadedFraction(id)(state),
    }),
    {
        playerStartPlaying,
        playerStopPlaying,
        playerUpdateVolume,
        playerPushPendingSeek,
    },
)(IndividualPlaybackControlBar);
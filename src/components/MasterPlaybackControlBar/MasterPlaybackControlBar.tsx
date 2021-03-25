import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { State } from '../../redux/types';
import { startPlayback, stopPlayback, seekTo, masterPlayerUpdateVolume } from '../../redux/actions/masterPlayerInfo';
import { PlaybackControlBar } from '../PlaybackControlBar';
import MasterPlaybackControlBarActions from './MasterPlaybackControlBarActions';
import { getIsMasterPlayerBuffering, getIsMasterPlayerPlaying, getMasterPlayerDurationSeconds, getMasterPlayerLoadedFraction, getMasterPlayerPlayedFraction, getMasterPlayerVolume } from '../../redux/selectors/masterPlayerInfo';

interface StateProps {
    isPlaying: boolean;
    isBuffering: boolean;
    volume: number;
    durationSeconds: number;
    playedFraction: number;
    loadedFraction: number;
}

interface DispatchProps {
    startPlayback: () => void;
    stopPlayback: () => void;
    updateVolume: (volume: number) => void;
    seekTo: (seconds: number) => void;
}

type MasterPlaybackControlBarProps = StateProps & DispatchProps;

const MasterPlaybackControlBar: React.FC<MasterPlaybackControlBarProps> = ({
    startPlayback,
    stopPlayback,
    updateVolume,
    seekTo,
    ...other
}) => {
    const playbackControlBarProps = {
        ...other,
        onPlay: startPlayback,
        onPause: stopPlayback,
        // TODO: add muting to master player.
        onMuteUnmute: () => {},
        onVolumeChange: updateVolume,
        onSeek: seekTo,

        actions: <MasterPlaybackControlBarActions />,
    };

    return <PlaybackControlBar {...playbackControlBarProps} />;
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        isPlaying: getIsMasterPlayerPlaying,
        isBuffering: getIsMasterPlayerBuffering,
        volume: getMasterPlayerVolume,
        durationSeconds: getMasterPlayerDurationSeconds,
        playedFraction: getMasterPlayerPlayedFraction,
        loadedFraction: getMasterPlayerLoadedFraction,
    }),
    {
        startPlayback,
        stopPlayback,
        seekTo,
        updateVolume: masterPlayerUpdateVolume,
    },
)(MasterPlaybackControlBar);

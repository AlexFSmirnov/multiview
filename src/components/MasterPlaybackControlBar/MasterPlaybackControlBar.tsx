import { connect } from 'react-redux';
import { State } from '../../redux/types';
import { startPlayback, stopPlayback, seekTo } from '../../redux/actions/masterPlayerInfo';
import { PlaybackControlBar } from '../PlaybackControlBar';
import MasterPlaybackControlBarActions from './MasterPlaybackControlBarActions';

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
    seekTo: (seconds: number) => void;
}

type MasterPlaybackControlBarProps = StateProps & DispatchProps;

const MasterPlaybackControlBar: React.FC<MasterPlaybackControlBarProps> = ({
    startPlayback,
    stopPlayback,
    seekTo,
    ...other
}) => {
    const playbackControlBarProps = {
        ...other,
        onPlay: startPlayback,
        onPause: stopPlayback,
        onMuteUnmute: () => {},
        onVolumeChange: () => {},
        onSeek: seekTo,

        actions: <MasterPlaybackControlBarActions />,
    };

    return <PlaybackControlBar {...playbackControlBarProps} />;
};

export default connect<StateProps, DispatchProps, {}, State>(
    state => ({
        isPlaying: state.masterPlayerInfo.isPlaying,
        isBuffering: state.masterPlayerInfo.isBuffering,
        volume: state.masterPlayerInfo.volume,
        durationSeconds: state.masterPlayerInfo.durationSeconds,
        playedFraction: state.masterPlayerInfo.playedFraction,
        loadedFraction: state.masterPlayerInfo.loadedFraction,
    }),
    {
        startPlayback,
        stopPlayback,
        seekTo,
    },
)(MasterPlaybackControlBar);

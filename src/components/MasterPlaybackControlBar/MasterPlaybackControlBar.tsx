import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { State } from '../../redux/types';
import { startPlayback, stopPlayback, seekTo, masterPlayerUpdateVolume, masterPlayerMute, masterPlayerUnmute } from '../../redux/actions/masterPlayerInfo';
import {
    getIsMasterPlayerBuffering,
    getIsMasterPlayerMuted,
    getIsMasterPlayerPlaying,
    getMasterPlayerDurationSeconds,
    getMasterPlayerLoadedFraction,
    getMasterPlayerPlayedFraction,
    getMasterPlayerVolume,
} from '../../redux/selectors/masterPlayerInfo';
import { PlaybackControlBar } from '../PlaybackControlBar';
import MasterPlaybackControlBarActions from './MasterPlaybackControlBarActions';

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
    startPlayback: () => void;
    stopPlayback: () => void;
    updateVolume: (volume: number) => void;
    mute: () => void;
    unmute: () => void;
    seekTo: (seconds: number) => void;
}

type MasterPlaybackControlBarProps = StateProps & DispatchProps;

const MasterPlaybackControlBar: React.FC<MasterPlaybackControlBarProps> = ({
    isMuted,
    startPlayback,
    stopPlayback,
    updateVolume,
    mute,
    unmute,
    seekTo,
    ...other
}) => {
    const handleMuteUnmute = () => {
        if (isMuted) {
            unmute();
        } else {
            mute();
        }
    };

    const playbackControlBarProps = {
        isMuted,
        onPlay: startPlayback,
        onPause: stopPlayback,
        onMuteUnmute: handleMuteUnmute,
        onVolumeChange: updateVolume,
        onSeek: seekTo,

        actions: <MasterPlaybackControlBarActions />,

        ...other,
    };

    return <PlaybackControlBar {...playbackControlBarProps} />;
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        isPlaying: getIsMasterPlayerPlaying,
        isBuffering: getIsMasterPlayerBuffering,
        isMuted: getIsMasterPlayerMuted,
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
        mute: masterPlayerMute,
        unmute: masterPlayerUnmute,
    },
)(MasterPlaybackControlBar);

import { connect } from 'react-redux';
import { IconButton, Typography } from '@material-ui/core';
import { PlayArrow, Pause, Settings, Fullscreen } from '@material-ui/icons';
import { State } from '../../redux/types';
import { startPlayback, stopPlayback } from '../../redux/actions/masterPlayerInfo';
import { PlaybackSlider } from '../PlaybackSlider';
import { VolumeControl } from '../VolumeControl';
import {
    MasterPlaybackControlBarContainer,
    MasterPlaybackControlBarOuterWrapper,
    MasterPlaybackControlBarInnerWrapper,
    MasterPlaybackControlBarProgressTextWrapper,
    MasterPlaybackControlBarButtonsSpacer,
} from './style';

interface OwnProps {

}

interface StateProps {
    isPlaying: boolean;
    isBuffering: boolean;
    durationSeconds: number;
    playedSeconds: number;
    playedFraction: number;
    loadedFraction: number;
}

interface DispatchProps {
    startPlayback: () => void;
    stopPlayback: () => void;
}

type MasterPlaybackControlBarProps = OwnProps & StateProps & DispatchProps;

const formatSeconds = (totalSeconds: number) => {
    const roundedSeconds = Math.round(totalSeconds);

    const hours = Math.floor(roundedSeconds / (60 * 60));
    const minutes = Math.floor((roundedSeconds % (60 * 60)) / 60);
    const seconds = roundedSeconds % 60;

    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours > 0 ? `${hours}:` : ''}${minutes}:${paddedSeconds}`
};

const MasterPlaybackControlBar: React.FC<MasterPlaybackControlBarProps> = ({
    isPlaying,
    isBuffering,
    durationSeconds,
    playedSeconds,
    playedFraction,
    loadedFraction,
    startPlayback,
    stopPlayback,
}) => {
    const handlePlayPauseClick = () => {
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    };

    const playbackSliderProps = {
        playedFraction,
        loadedFraction,
        isBuffering,
    };

    return (
        <MasterPlaybackControlBarContainer>
            <PlaybackSlider {...playbackSliderProps} />
            <MasterPlaybackControlBarOuterWrapper>
                <IconButton size="small" onClick={handlePlayPauseClick}>
                    {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <MasterPlaybackControlBarInnerWrapper>
                    <div style={{ width: '10px' }} />

                    <VolumeControl volume={1} />

                    <MasterPlaybackControlBarProgressTextWrapper>
                        <Typography variant="body2">{formatSeconds(playedSeconds)}</Typography>
                        <div style={{ width: '4px' }} />
                        <Typography variant="body2"> / </Typography>
                        <div style={{ width: '4px' }} />
                        <Typography variant="body2">{formatSeconds(durationSeconds)}</Typography>
                    </MasterPlaybackControlBarProgressTextWrapper>

                    <MasterPlaybackControlBarButtonsSpacer />

                    <IconButton size="small">
                        <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Settings fontSize="small" />
                        </div>
                    </IconButton>
                    <IconButton size="small">
                        <Fullscreen />
                    </IconButton>
                </MasterPlaybackControlBarInnerWrapper>
            </MasterPlaybackControlBarOuterWrapper>
        </MasterPlaybackControlBarContainer>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    state => ({
        isPlaying: state.masterPlayerInfo.isPlaying,
        isBuffering: state.masterPlayerInfo.isBuffering,
        durationSeconds: state.masterPlayerInfo.durationSeconds,
        playedSeconds: state.masterPlayerInfo.playedSeconds,
        playedFraction: state.masterPlayerInfo.playedFraction,
        loadedFraction: state.masterPlayerInfo.loadedFraction,
    }),
    {
        startPlayback,
        stopPlayback,
    },
)(MasterPlaybackControlBar);

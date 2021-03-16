import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause, Settings, Fullscreen } from '@material-ui/icons';
import { State } from '../../redux/types';
import { startPlayback, stopPlayback } from '../../redux/actions/masterPlayerInfo';
import { PlaybackSlider } from '../PlaybackSlider';
import { VolumeControl } from '../VolumeControl';
import { MasterPlaybackControlBarButtonsContainer, MasterPlaybackControlBarContainer, MasterPlaybackControlBarButtonsSpacer } from './style';

interface OwnProps {

}

interface StateProps {
    isPlaying: boolean;
    playedFraction: number;
    loadedFraction: number;
}

interface DispatchProps {
    startPlayback: () => void;
    stopPlayback: () => void;
}

type MasterPlaybackControlBarProps = OwnProps & StateProps & DispatchProps;

const MasterPlaybackControlBar: React.FC<MasterPlaybackControlBarProps> = ({
    isPlaying,
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

    return (
        <MasterPlaybackControlBarContainer>
            <PlaybackSlider playedFraction={playedFraction} loadedFraction={loadedFraction} />
            <MasterPlaybackControlBarButtonsContainer>
                <IconButton size="small" onClick={handlePlayPauseClick}>
                    {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <div style={{ height: '30px', flex: 1, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '10px' }} />

                    <VolumeControl volume={1} />

                    <MasterPlaybackControlBarButtonsSpacer />

                    <IconButton size="small">
                        <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Settings fontSize="small" />
                        </div>
                    </IconButton>
                    <IconButton size="small">
                        <Fullscreen />
                    </IconButton>
                </div>
            </MasterPlaybackControlBarButtonsContainer>
        </MasterPlaybackControlBarContainer>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    state => ({
        isPlaying: state.masterPlayerInfo.isPlaying,
        playedFraction: state.masterPlayerInfo.playedFraction,
        loadedFraction: state.masterPlayerInfo.loadedFraction,
    }),
    {
        startPlayback,
        stopPlayback,
    },
)(MasterPlaybackControlBar);

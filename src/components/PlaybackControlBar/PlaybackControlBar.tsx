import { IconButton } from '@material-ui/core';
import { PlayArrow, Settings, Fullscreen } from '@material-ui/icons';
import { PlaybackSlider } from '../PlaybackSlider';
import { VolumeControl } from '../VolumeControl';
import { PlaybackControlBarButtonsContainer, PlaybackControlBarContainer, PlaybackControllBarButtonsSpacer } from './style';

interface PlaybackControlBarProps {

}

const PlaybackControlBar: React.FC<PlaybackControlBarProps> = ({}) => {

    return (
        <PlaybackControlBarContainer>
            <PlaybackSlider />
            <PlaybackControlBarButtonsContainer>
                <IconButton size="small">
                    <PlayArrow fontSize="large" />
                </IconButton>
                <div style={{ height: '30px', flex: 1, display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '10px' }} />

                    <VolumeControl volume={1} />

                    <PlaybackControllBarButtonsSpacer />

                    <IconButton size="small">
                        <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Settings fontSize="small" />
                        </div>
                    </IconButton>
                    <IconButton size="small">
                        <Fullscreen />
                    </IconButton>
                </div>
            </PlaybackControlBarButtonsContainer>
        </PlaybackControlBarContainer>
    );
};

export default PlaybackControlBar;

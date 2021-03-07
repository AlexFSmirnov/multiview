import { useState } from 'react';
import { IconButton, Slider, withStyles } from '@material-ui/core';
import { VolumeOff, VolumeDown, VolumeUp } from '@material-ui/icons';
import { VolumeControlContainer, VolumeControlIconContainer, VolumeControlSliderContainer } from './style';

const VolumeSlider = withStyles({
    root: {
        color: 'white',
        height: 4,
    },
    thumb: {
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    track: {
        height: 4,
        marginTop: -1,
    },
    rail: {
        height: 4,
        marginTop: -1,
    },
})(Slider);

interface VolumeControlProps {
    volume: number;
    isMuted?: boolean;
    onVolumeChange?: (volume: number) => void;
    onMuteUnmute?: (isMuted: boolean) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, isMuted, onVolumeChange, onMuteUnmute }) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isAdjustingVolume, setIsAdjustingVolume] = useState(false);

    const handleVolumeChange = (_: React.ChangeEvent<{}>, v: any) => {
        console.log(v);
        if (onVolumeChange) {
            onVolumeChange(v);
        }
    };

    const handleIconClick = () => {
        if (onMuteUnmute) {
            onMuteUnmute(!isMuted);
        }
    };

    const volumeControlContainerProps = {
        isSliderVisible: isMouseOver || isAdjustingVolume,
        onMouseEnter: () => setIsMouseOver(true),
        onMouseLeave: () => setIsMouseOver(false),
    };

    const volumeControlSliderContainerProps = {
        onMouseDown: () => setIsAdjustingVolume(true),
        onMouseUp: () => setIsAdjustingVolume(false),
    };

    const volumeSliderProps = {
        min: 0,
        max: 1,
        step: 0.01,
        onChange: handleVolumeChange,
    };

    return (
        <VolumeControlContainer {...volumeControlContainerProps}>
            <VolumeControlIconContainer>
                <IconButton size="small" onClick={handleIconClick}>
                    {getVolumeIcon(volume, isMuted)}
                </IconButton>
            </VolumeControlIconContainer>
            <VolumeControlSliderContainer {...volumeControlSliderContainerProps}>
                <VolumeSlider {...volumeSliderProps} />
            </VolumeControlSliderContainer>
        </VolumeControlContainer>
    );
};

const getVolumeIcon = (volume: number, isMuted?: boolean) => {
    if (isMuted || volume === 0) {
        return <VolumeOff />;
    } else if (volume < 0.5) {
        return <VolumeDown />;
    } else {
        return <VolumeUp />;
    }
};

export default VolumeControl;

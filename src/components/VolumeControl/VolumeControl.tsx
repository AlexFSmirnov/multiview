import { useState, useEffect } from 'react';
import { throttle } from 'lodash/fp';
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

const throttledOnVolumeChange = throttle(100, (volume: number, onVolumeChange?: (volume: number) => void) => {
    if (onVolumeChange) {
        onVolumeChange(volume);
    }
});

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, isMuted, onVolumeChange, onMuteUnmute }) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isAdjustingVolume, setIsAdjustingVolume] = useState(false);
    const [internalVolume, setInternalVolume] = useState(volume);

    useEffect(() => {
        if (!isAdjustingVolume) {
            setInternalVolume(volume);
        }
    }, [volume, isAdjustingVolume, setInternalVolume]);

    useEffect(() => {
        window.addEventListener('mouseup', () => setIsAdjustingVolume(false));

        return () => {
            window.removeEventListener('mouseup', () => setIsAdjustingVolume(false));
        };
    }, [setIsAdjustingVolume]);

    const handleVolumeChange = (_: React.ChangeEvent<{}>, v: number | number[]) => {
        const parsedVolume = (Array.isArray(v) ? v[0] : v) || 0;

        throttledOnVolumeChange(parsedVolume, onVolumeChange);
        setInternalVolume(parsedVolume);
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
        value: internalVolume,
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

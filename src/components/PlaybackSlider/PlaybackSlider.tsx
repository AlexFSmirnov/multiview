import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@material-ui/core';
import { throttle } from 'lodash/fp';
import { PlaybackSliderBar, PlaybackSliderContainer, PlaybackSliderInteractionContainer, PlaybackSliderScrubber } from './style'

export interface PlaybackSliderProps {
    playedFraction: number;
    loadedFraction: number;
    isBuffering: boolean;
    onSeekCallbackThrottle?: number;
    onSeek?: (playedFraction: number) => void;
}

const PlaybackSlider: React.FC<PlaybackSliderProps> = ({ playedFraction, loadedFraction, isBuffering, onSeekCallbackThrottle = 200, onSeek }) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isScrubberGrabbed, setIsScrubberGrabbed] = useState(false);
    const [internalPlayedFraction, setInternalPlayedFraction] = useState(playedFraction);

    const sliderContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isScrubberGrabbed && !isBuffering) {
            setInternalPlayedFraction(playedFraction);
        }
    }, [playedFraction, isScrubberGrabbed, isBuffering]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const debouncedHandleSeek = throttle(onSeekCallbackThrottle, (playedFraction: number) => {
        if (onSeek) {
            onSeek(playedFraction);
        }
    });

    const handleNewPlayedFractionSelected = (mouseX: number) => {
        const { current: sliderContainer } = sliderContainerRef;
        if (sliderContainer) {
            const sliderContainerWidth = sliderContainer.clientWidth;
            const windowWidth = window.innerWidth;
            const padding = (windowWidth - sliderContainerWidth) / 2;
            const paddedMouseX = mouseX - padding;

            const newPlayedFraction = paddedMouseX / sliderContainerWidth;
            setInternalPlayedFraction(newPlayedFraction);
            debouncedHandleSeek(newPlayedFraction);
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        handleNewPlayedFractionSelected(event.clientX);
        event.preventDefault();
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsScrubberGrabbed(true);
        handleNewPlayedFractionSelected(event.clientX);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        setIsScrubberGrabbed(false);

        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const isInteractable = isHovered || isScrubberGrabbed;

    const interactionContainerProps = {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
    };

    return (
        <PlaybackSliderInteractionContainer {...interactionContainerProps}>
            <PlaybackSliderContainer wide={isInteractable} ref={sliderContainerRef}>
                <PlaybackSliderBar progress={1} color="rgba(255, 255, 255, 0.2)" />
                <PlaybackSliderBar progress={loadedFraction} color="rgba(255, 255, 255, 0.6)" />
                <PlaybackSliderBar progress={internalPlayedFraction} color={theme.palette.primary.light} />
                <PlaybackSliderScrubber progress={internalPlayedFraction} color={theme.palette.primary.light} visible={isInteractable} />
            </PlaybackSliderContainer>
        </PlaybackSliderInteractionContainer>
    );
};

export default PlaybackSlider;

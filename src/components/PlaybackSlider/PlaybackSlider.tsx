import React, { useState, useEffect, useRef } from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { throttle } from 'lodash/fp';
import { formatSeconds } from '../../utils';
import { PlaybackSliderBar, PlaybackSliderContainer, PlaybackSliderInteractionContainer, PlaybackSliderScrubber, PlaybackSliderTimePreviewContainer } from './style'

export interface PlaybackSliderProps {
    playedFraction: number;
    loadedFraction: number;
    durationSeconds: number;
    isBuffering: boolean;
    onSeek?: (playedFraction: number) => void;
}

const throttledHandleSeek = throttle(1000, (playedFraction: number, onSeek?: (playedFraction: number) => void) => {
    if (onSeek) {
        onSeek(playedFraction);
    }
});

const PlaybackSlider: React.FC<PlaybackSliderProps> = ({ playedFraction, loadedFraction, durationSeconds, isBuffering, onSeek }) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [isScrubberGrabbed, setIsScrubberGrabbed] = useState(false);
    const [internalPlayedFraction, setInternalPlayedFraction] = useState(playedFraction);
    const [mousePosFraction, setMousePosFraction] = useState(0);

    const sliderContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isScrubberGrabbed && !isBuffering) {
            setInternalPlayedFraction(playedFraction);
        }
    }, [playedFraction, isScrubberGrabbed, isBuffering]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const getMousePosFraction = (mouseX: number) => {
        const { current: sliderContainer } = sliderContainerRef;
        if (sliderContainer) {
            const { width: sliderContainerWidth, x: sliderContainerX } = sliderContainer.getBoundingClientRect();

            const relativeMouseX = mouseX - sliderContainerX;
            const clampedMouseX = Math.max(0, Math.min(sliderContainerWidth, relativeMouseX));

            return clampedMouseX / sliderContainerWidth;
        }

        return 0;
    };

    const handleNewPlayedFractionSelected = (mouseX: number) => {
        const newMousePosFraction = getMousePosFraction(mouseX);
        setMousePosFraction(newMousePosFraction);
        setInternalPlayedFraction(newMousePosFraction);
        throttledHandleSeek(newMousePosFraction, onSeek);
    };

    const handleWindowMouseMove = (event: MouseEvent) => {
        handleNewPlayedFractionSelected(event.clientX);
        event.preventDefault();
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const newMousePosFraction = getMousePosFraction(event.clientX);
        setMousePosFraction(newMousePosFraction);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsScrubberGrabbed(true);
        handleNewPlayedFractionSelected(event.clientX);

        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        setIsScrubberGrabbed(false);

        window.removeEventListener('mousemove', handleWindowMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const isInteractable = isHovered || isScrubberGrabbed;

    const interactionContainerProps = {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
    };

    if (durationSeconds === null || durationSeconds === Infinity) {
        return (
            <PlaybackSliderInteractionContainer style={{ cursor: 'initial '}}>
                <PlaybackSliderContainer wide={false}>
                    <PlaybackSliderBar progress={1} color="rgba(255, 255, 255, 0.2)" />
                </PlaybackSliderContainer>
            </PlaybackSliderInteractionContainer>
        );
    }

    return (
        <PlaybackSliderInteractionContainer {...interactionContainerProps}>
            <PlaybackSliderContainer wide={isInteractable} ref={sliderContainerRef}>
                <PlaybackSliderBar progress={1} color="rgba(255, 255, 255, 0.2)" />
                <PlaybackSliderBar progress={loadedFraction} color="rgba(255, 255, 255, 0.6)" />
                <PlaybackSliderBar progress={internalPlayedFraction} color={theme.palette.primary.light} />

                <PlaybackSliderScrubber progress={internalPlayedFraction} color={theme.palette.primary.light} visible={isInteractable} />

                <PlaybackSliderTimePreviewContainer progress={mousePosFraction} visible={isInteractable}>
                    <Typography variant="caption">
                        {formatSeconds(Math.round(mousePosFraction * durationSeconds))}
                    </Typography>
                </PlaybackSliderTimePreviewContainer>
            </PlaybackSliderContainer>
        </PlaybackSliderInteractionContainer>
    );
};

export default PlaybackSlider;

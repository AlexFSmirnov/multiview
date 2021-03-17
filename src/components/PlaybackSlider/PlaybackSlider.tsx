import { useTheme } from '@material-ui/core';
import { useState } from 'react';
import { PlaybackSliderBar, PlaybackSliderContainer, PlaybackSliderHoverContainer, PlaybackSliderScrubber } from './style'

export interface PlaybackSliderProps {
    playedFraction: number;
    loadedFraction: number;
    onSeek?: (playedFraction: number) => void;
}

const PlaybackSlider: React.FC<PlaybackSliderProps> = ({ playedFraction, loadedFraction, onSeek }) => {
    const theme = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <PlaybackSliderHoverContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <PlaybackSliderContainer wide={isHovered}>
                <PlaybackSliderBar progress={1} color="rgba(255, 255, 255, 0.2)" />
                <PlaybackSliderBar progress={loadedFraction} color="rgba(255, 255, 255, 0.6)" />
                <PlaybackSliderBar progress={playedFraction} color={theme.palette.primary.light} />
                <PlaybackSliderScrubber progress={playedFraction} color={theme.palette.primary.light} visible={isHovered} />
            </PlaybackSliderContainer>
        </PlaybackSliderHoverContainer>
    );
};

export default PlaybackSlider;

import { PlaybackSliderContainer, PlaybackSliderLoaded, PlaybackSliderPlayed } from './style'

export interface PlaybackSliderProps {
    playedFraction: number;
    loadedFraction: number;
}

const PlaybackSlider: React.FC<PlaybackSliderProps> = ({ playedFraction, loadedFraction }) => (
    <PlaybackSliderContainer>
        <PlaybackSliderLoaded loadedFraction={loadedFraction} />
        <PlaybackSliderPlayed playedFraction={playedFraction} />
    </PlaybackSliderContainer>
);

export default PlaybackSlider;

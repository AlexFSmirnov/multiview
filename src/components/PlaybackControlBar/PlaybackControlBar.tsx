import { IconButton, Typography } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';
import { formatSeconds } from '../../utils';
import { PlaybackSlider } from '../PlaybackSlider';
import { VolumeControl } from '../VolumeControl';
import {
    PlaybackControlBarContainer,
    PlaybackControlBarOuterWrapper,
    PlaybackControlBarInnerWrapper,
    PlaybackControlBarProgressTextWrapper,
    PlaybackControlBarButtonsSpacer,
    PlaybackControlBarActionsWrapper,
} from './style';

interface PlaybackControlBarProps {
    isPlaying: boolean;
    isBuffering: boolean;
    isMuted: boolean;
    volume: number;
    durationSeconds: number;
    playedFraction: number;
    loadedFraction: number;

    onPlay: () => void;
    onPause: () => void;
    onMuteUnmute: (isMuted: boolean) => void;
    onVolumeChange: (volume: number) => void;
    onSeek: (seconds: number) => void;

    actions: JSX.Element;
}

const PlaybackControlBar: React.FC<PlaybackControlBarProps> = ({
    isPlaying,
    isBuffering,
    isMuted,
    volume,
    durationSeconds,
    playedFraction,
    loadedFraction,
    onPlay,
    onPause,
    onMuteUnmute,
    onVolumeChange,
    onSeek,
    actions,
}) => {
    const handlePlayPauseClick = () => {
        if (isPlaying) {
            onPause();
        } else {
            onPlay();
        }
    };

    const handleSeek = (seekFraction: number) => {
        onSeek(seekFraction * durationSeconds);
    };

    const playbackSliderProps = {
        playedFraction,
        loadedFraction,
        durationSeconds,
        isBuffering,
        onSeek: handleSeek,
    };

    const volumeControlProps = {
        volume: isMuted ? 0 : volume,
        onMuteUnmute,
        onVolumeChange,
    };

    return (
        <PlaybackControlBarContainer>
            <PlaybackSlider {...playbackSliderProps} />
            <PlaybackControlBarOuterWrapper>
                <IconButton size="small" onClick={handlePlayPauseClick}>
                    {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                </IconButton>
                <PlaybackControlBarInnerWrapper>
                    <div style={{ width: '10px' }} />

                    <VolumeControl {...volumeControlProps} />

                    <PlaybackControlBarProgressTextWrapper>
                        <Typography variant="body2">{formatSeconds(Math.round(playedFraction * durationSeconds))}</Typography>
                        <div style={{ width: '4px' }} />
                        <Typography variant="body2"> / </Typography>
                        <div style={{ width: '4px' }} />
                        <Typography variant="body2">{formatSeconds(durationSeconds)}</Typography>
                    </PlaybackControlBarProgressTextWrapper>

                    <PlaybackControlBarButtonsSpacer />

                    <PlaybackControlBarActionsWrapper>
                        {actions}
                    </PlaybackControlBarActionsWrapper>
                </PlaybackControlBarInnerWrapper>
            </PlaybackControlBarOuterWrapper>
        </PlaybackControlBarContainer>
    );
};

export default PlaybackControlBar;

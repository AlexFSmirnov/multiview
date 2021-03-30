import { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { State } from '../../redux/types';
import {
    getFocusedPlayerDurationSeconds,
    getFocusedPlayerId,
    getFocusedPlayerPlayedSeconds,
    getIsFocusedPlayerPlaying,
    getFocusedPlayerVolume,
    getIsFocusedPlayerMuted,
} from '../../redux/selectors';
import {
    playerStartPlaying,
    startPlayback,
    playerStopPlaying,
    stopPlayback,
    playerPushPendingSeek,
    seekTo,
    playerUpdateVolume,
    masterPlayerUpdateVolume,
    playerMute,
    masterPlayerMute,
    playerUnmute,
    masterPlayerUnmute,
} from '../../redux/actions';

const ARROW_SEEK_AMOUNT = 5;
const ARROW_VOLUME_AMOUNT = 0.1;

interface OwnProps {
    isActive: boolean;
}

interface StateProps {
    isPlaying: boolean;
    focusedPlayerId: string | null;
    playedSeconds: number;
    durationSeconds: number;
    volume: number;
    isMuted: boolean;
}

interface DispatchProps {
    playerStartPlaying: (id: string) => void;
    masterPlayerStartPlaying: () => void;
    playerStopPlaying: (id: string) => void;
    masterPlayerStopPlaying: () => void;
    playerSeekTo: (id: string, { seekToSeconds }: { seekToSeconds: number }) => void;
    masterPlayerSeekTo: (seekToSeconds: number) => void;
    playerUpdateVolume: (id: string, { volume }: { volume: number }) => void;
    masterPlayerUpdateVolume: (volume: number) => void;
    playerMute: (id: string) => void;
    masterPlayerMute: () => void;
    playerUnmute: (id: string) => void;
    masterPlayerUnmute: () => void;
}

export type KeyboardEventHandlerProps = OwnProps & StateProps & DispatchProps;

const KeyboardEventHandler: React.FC<KeyboardEventHandlerProps> = ({
    isActive,
    isPlaying,
    focusedPlayerId,
    playedSeconds,
    durationSeconds,
    volume,
    isMuted,
    playerStartPlaying,
    masterPlayerStartPlaying,
    playerStopPlaying,
    masterPlayerStopPlaying,
    playerSeekTo,
    masterPlayerSeekTo,
    playerUpdateVolume,
    masterPlayerUpdateVolume,
    playerMute,
    masterPlayerMute,
    playerUnmute,
    masterPlayerUnmute,
}) => {
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (!isActive) {
            return;
        }

        console.log(e);

        let shouldPreventDefault = true;
        switch (e.code) {
            case 'Space':
                if (isPlaying) {
                    if (focusedPlayerId) {
                        playerStopPlaying(focusedPlayerId);
                    } else {
                        masterPlayerStopPlaying();
                    }
                } else {
                    if (focusedPlayerId) {
                        playerStartPlaying(focusedPlayerId);
                    } else {
                        masterPlayerStartPlaying();
                    }
                }
                break;

            case 'ArrowLeft':
            case 'ArrowRight':
                const seekToSeconds = Math.max(0, Math.min(durationSeconds, playedSeconds + (e.code === 'ArrowLeft' ? -1 : 1) * ARROW_SEEK_AMOUNT));

                if (focusedPlayerId) {
                    playerSeekTo(focusedPlayerId, { seekToSeconds });
                } else {
                    masterPlayerSeekTo(seekToSeconds);
                }

                break;

            case 'ArrowUp':
            case 'ArrowDown':
                const newVolume = Math.max(0, Math.min(1, volume + (e.code === 'ArrowDown' ? -1 : 1) * ARROW_VOLUME_AMOUNT));

                if (focusedPlayerId) {
                    playerUpdateVolume(focusedPlayerId, { volume: newVolume });
                } else {
                    masterPlayerUpdateVolume(newVolume);
                }

                break;

            case 'KeyM':
                if (isMuted) {
                    if (focusedPlayerId) {
                        playerUnmute(focusedPlayerId);
                    } else {
                        masterPlayerUnmute();
                    }
                } else {
                    if (focusedPlayerId) {
                        playerMute(focusedPlayerId);
                    } else {
                        masterPlayerMute();
                    }
                }
                break;

            default:
                shouldPreventDefault = false;
                break;
        }

        if (shouldPreventDefault) {
            e.preventDefault();
        }
    }, [
        isActive,
        isPlaying,
        focusedPlayerId,
        durationSeconds,
        playedSeconds,
        volume,
        isMuted,
        playerStartPlaying,
        masterPlayerStartPlaying,
        playerStopPlaying,
        masterPlayerStopPlaying,
        playerSeekTo,
        masterPlayerSeekTo,
        playerUpdateVolume,
        masterPlayerUpdateVolume,
        playerMute,
        masterPlayerMute,
        playerUnmute,
        masterPlayerUnmute,
    ]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);


    return null;
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        focusedPlayerId: getFocusedPlayerId,
        isPlaying: getIsFocusedPlayerPlaying,
        durationSeconds: getFocusedPlayerDurationSeconds,
        playedSeconds: getFocusedPlayerPlayedSeconds,
        volume: getFocusedPlayerVolume,
        isMuted: getIsFocusedPlayerMuted,
    }),
    {
        playerStartPlaying,
        masterPlayerStartPlaying: startPlayback,
        playerStopPlaying,
        masterPlayerStopPlaying: stopPlayback,
        playerSeekTo: playerPushPendingSeek,
        masterPlayerSeekTo: seekTo,
        playerUpdateVolume,
        masterPlayerUpdateVolume,
        playerMute,
        masterPlayerMute,
        playerUnmute,
        masterPlayerUnmute,
    },
)(KeyboardEventHandler);

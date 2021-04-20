import { useEffect, useState, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Fab } from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { changeFocusedPlayerId, playerStartPlaying, playerStopPlaying, startPlayback, stopPlayback } from '../../redux/actions';
import { getControlsMode, getIsFullscreen, getIsMasterPlayerPlaying, getIsPlayerPlaying } from '../../redux/selectors';
import { ControlsMode, State } from '../../redux/types';
import { IndividualPlaybackControlBar } from '../IndividualPlaybackControlBar';
import { MasterPlaybackControlBar } from '../MasterPlaybackControlBar';
import {
    PlayerControlOverlayContainer,
    PlaybackControlBarWrapper,
    PlaybackControlBarFlexSpacer,
    PlaybackControlOverlayBottomShadow,
    PlayerControlOverlayClickCapture,
    MinimizedButtonContainer,
} from './style';

interface OwnProps {
    id?: string;
    width?: number;
    height?: number;
}

interface StateProps {
    isPlaying: boolean;
    isFullscreen: boolean;
    controlsMode: ControlsMode;
}

interface DispatchProps {
    playerStartPlaying: (id: string) => void;
    playerStopPlaying: (id: string) => void;
    masterPlayerStartPlaying: () => void;
    masterPlayerStopPlaying: () => void;
    changeFocusedPlayerId: (id: string | null) => void;
}

export type PlayerControlOverlayProps = OwnProps & StateProps & DispatchProps;

const PlayerControlOverlay: React.FC<PlayerControlOverlayProps> = ({
    id,
    width,
    height,
    isPlaying,
    isFullscreen,
    controlsMode,
    playerStartPlaying,
    playerStopPlaying,
    masterPlayerStartPlaying,
    masterPlayerStopPlaying,
    changeFocusedPlayerId,
}) => {
    const hideControlsTimeoutId = useRef<number | null>(null);

    const [isMinimized, setIsMinimized] = useState(false);
    const [isMouseOverPlayer, setIsMouseOverPlayer] = useState(false);
    const [isControlBarVisible, setIsControlBarVisible] = useState(true);

    const updateHideTimeout = useCallback(() => {
        if (hideControlsTimeoutId.current) {
            window.clearTimeout(hideControlsTimeoutId.current);
        }

        hideControlsTimeoutId.current = window.setTimeout(() => {
            if (isPlaying) {
                setIsControlBarVisible(false);
            }

            hideControlsTimeoutId.current = null;
        }, 3000);
    }, [isPlaying]);

    useEffect(() => {
        updateHideTimeout();
    }, [isPlaying, updateHideTimeout]);

    useEffect(() => {
        if (!id || (id && controlsMode === ControlsMode.Individual)) {
            setIsControlBarVisible(!isPlaying || isMouseOverPlayer);
        } else {
            setIsControlBarVisible(false);
        }
    }, [isPlaying, isMouseOverPlayer, controlsMode, id]);

    const handleMouseEnter = () => {
        setIsMouseOverPlayer(true);
        changeFocusedPlayerId(id || null);
    };

    const handleMouseLeave = () => {
        setIsMouseOverPlayer(false);
        changeFocusedPlayerId(null);
    };

    const handleMouseMove = () => {
        if (isMouseOverPlayer) {
            setIsControlBarVisible(true);
        }

        updateHideTimeout();
    };

    const handleClick = () => {
        if (isPlaying) {
            if (id) {
                playerStopPlaying(id);
            } else {
                masterPlayerStopPlaying();
            }
        } else {
            updateHideTimeout();

            if (id) {
                playerStartPlaying(id);
            } else {
                masterPlayerStartPlaying();
            }
        }
    };

    const handleHide = () => setIsMinimized(true);
    const handleShow = () => setIsMinimized(false);

    const isMaster = !id;
    const isOverlaid = (isMaster && isFullscreen) || !isMaster;
    const isBlockingPointerEvents = (isMaster && controlsMode === ControlsMode.Grouped) || !isMaster;

    const playbackControlOverlayContainerProps = {
        isBlockingPointerEvents,
        isCursorHidden: !isControlBarVisible,
        zIndex: isMaster ? 3 : undefined,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
    };

    if (isMinimized) {
        return (
            <MinimizedButtonContainer>
                <Tooltip title="Show controls overlay">
                    <Fab size="small" onClick={handleShow}>
                        <Visibility fontSize="small" />
                    </Fab>
                </Tooltip>
            </MinimizedButtonContainer>
        );
    }

    return (
        <>
            <PlayerControlOverlayContainer {...playbackControlOverlayContainerProps}>
                <PlaybackControlOverlayBottomShadow isVisible={isControlBarVisible && isOverlaid} />
                <PlayerControlOverlayClickCapture onClick={handleClick} />
                <PlaybackControlBarWrapper isVisible={isControlBarVisible || !isOverlaid}>
                    {id
                        ? <IndividualPlaybackControlBar id={id} onHide={handleHide} playerWidth={width} playerHeight={height} />
                        : <MasterPlaybackControlBar isVisible={isControlBarVisible || !isOverlaid} playerWidth={width} playerHeight={height} />
                    }
                </PlaybackControlBarWrapper>
            </PlayerControlOverlayContainer>

            {(isMaster && !isFullscreen) ? <PlaybackControlBarFlexSpacer /> : null}
        </>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state: State, { id }: OwnProps) => ({
        isPlaying: id ? getIsPlayerPlaying(id)(state) : getIsMasterPlayerPlaying(state),
        isFullscreen: getIsFullscreen(state),
        controlsMode: getControlsMode(state),
    }),
    {
        playerStartPlaying,
        playerStopPlaying,
        masterPlayerStartPlaying: startPlayback,
        masterPlayerStopPlaying: stopPlayback,
        changeFocusedPlayerId,
    },
)(PlayerControlOverlay);

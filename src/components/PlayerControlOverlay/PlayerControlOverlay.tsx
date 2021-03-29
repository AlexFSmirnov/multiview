import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getControlsMode, getIsFullscreen, getIsMasterPlayerPlaying, getIsPlayerPlaying } from '../../redux/selectors';
import { ControlsMode, State } from '../../redux/types';
import { IndividualPlaybackControlBar } from '../IndividualPlaybackControlBar';
import { MasterPlaybackControlBar } from '../MasterPlaybackControlBar';
import { PlayerControlOverlayContainer, PlaybackControlBarWrapper, PlaybackControlBarFlexSpacer, PlaybackControlOverlayBottomShadow } from './style';

interface OwnProps {
    id?: string;
}

interface StateProps {
    isPlaying: boolean;
    isFullscreen: boolean;
    controlsMode: ControlsMode;
}

interface DispatchProps {

}

export type PlayerControlOverlayProps = OwnProps & StateProps & DispatchProps;

const PlayerControlOverlay: React.FC<PlayerControlOverlayProps> = ({ id, isPlaying, isFullscreen, controlsMode }) => {
    const hideControlsTimeoutId = useRef<number | null>(null);

    const [isMouseOverPlayer, setIsMouseOverPlayer] = useState(true);
    const [isControlBarVisible, setIsControlBarVisible] = useState(true);

    useEffect(() => {
        if (!id || (id && controlsMode === ControlsMode.Individual)) {
            setIsControlBarVisible(!isPlaying || isMouseOverPlayer);
        } else {
            setIsControlBarVisible(false);
        }
    }, [isPlaying, isMouseOverPlayer, controlsMode, id]);

    const handleMouseEnter = () => {
        setIsMouseOverPlayer(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOverPlayer(false);
    };

    const handleMouseMove = () => {
        if (isMouseOverPlayer) {
            setIsControlBarVisible(true);
        }

        if (hideControlsTimeoutId.current) {
            window.clearTimeout(hideControlsTimeoutId.current);
        }

        hideControlsTimeoutId.current = window.setTimeout(() => {
            if (isPlaying) {
                setIsControlBarVisible(false);
            }

            hideControlsTimeoutId.current = null;
        }, 3000);
    };


    const isMaster = !id;

    const isOverlaid = (isMaster && isFullscreen) || !isMaster;
    const isBlockingPointerEvents = (isMaster && controlsMode === ControlsMode.Grouped) || !isMaster;

    const playbackControlOverlayContainerProps = {
        isBlockingPointerEvents,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseMove: handleMouseMove,
    };

    return (
        <>
            <PlayerControlOverlayContainer {...playbackControlOverlayContainerProps}>
                <PlaybackControlOverlayBottomShadow isVisible={isControlBarVisible && isOverlaid} />
                <PlaybackControlBarWrapper isVisible={isControlBarVisible || !isOverlaid}>
                    {id
                        ? <IndividualPlaybackControlBar id={id} />
                        : <MasterPlaybackControlBar isVisible={isControlBarVisible || !isOverlaid} />
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

    },
)(PlayerControlOverlay);

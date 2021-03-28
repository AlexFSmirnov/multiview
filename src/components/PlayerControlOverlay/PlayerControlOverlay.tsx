import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getControlsMode, getIsFullscreen } from '../../redux/selectors';
import { ControlsMode, State } from '../../redux/types';
import { IndividualPlaybackControlBar } from '../IndividualPlaybackControlBar';
import { MasterPlaybackControlBar } from '../MasterPlaybackControlBar';
import { PlayerControlOverlayContainer, PlaybackControlBarWrapper, PlaybackControlBarFlexSpacer, PlaybackControlOverlayBottomShadow } from './style';

interface OwnProps {
    id?: string;
}

interface StateProps {
    isFullscreen: boolean;
    controlsMode: ControlsMode;
}

interface DispatchProps {

}

export type PlayerControlOverlayProps = OwnProps & StateProps & DispatchProps;

const PlayerControlOverlay: React.FC<PlayerControlOverlayProps> = ({ id, isFullscreen, controlsMode }) => {
    const [isControlBarVisible, setIsControlBarVisible] = useState(false);

    // TODO: Smart hide based on whether the player is playing.
    const handleMouseEnter = () => {
        setIsControlBarVisible(true);
    };

    const handleMouseLeave = () => {
        setIsControlBarVisible(false);
    };


    const isMaster = !id;

    const isOverlaid = (isMaster && isFullscreen) || !isMaster;
    const isBlockingPointerEvents = (isMaster && controlsMode === ControlsMode.Grouped) || !isMaster;

    const playbackControlOverlayContainerProps = {
        isBlockingPointerEvents,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    };

    return (
        <>
            <PlayerControlOverlayContainer {...playbackControlOverlayContainerProps}>
                <PlaybackControlOverlayBottomShadow isVisible={isControlBarVisible && isOverlaid} />
                <PlaybackControlBarWrapper isVisible={isControlBarVisible || !isOverlaid}>
                    {id
                        ? <IndividualPlaybackControlBar id={id} />
                        : <MasterPlaybackControlBar />
                    }
                </PlaybackControlBarWrapper>
            </PlayerControlOverlayContainer>

            {(isMaster && !isFullscreen) ? <PlaybackControlBarFlexSpacer /> : null}
        </>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    createStructuredSelector({
        isFullscreen: getIsFullscreen,
        controlsMode: getControlsMode,
    }),
    {

    },
)(PlayerControlOverlay);

import { useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/types';
import { IndividualPlaybackControlBar } from '../IndividualPlaybackControlBar';
import { MasterPlaybackControlBar } from '../MasterPlaybackControlBar';
import { PlayerControlOverlayContainer, PlaybackControlBarWrapper, PlaybackControlBarFlexSpacer, PlaybackControlOverlayBottomShadow } from './style';

// TODO: generalize for master player too (for now idk which props this will need).

interface OwnProps {
    id?: string;
}

interface StateProps {

}

interface DispatchProps {

}

export type PlayerControlOverlayProps = OwnProps & StateProps & DispatchProps;

const PlayerControlOverlay: React.FC<PlayerControlOverlayProps> = ({ id }) => {
    const [isControlBarVisible, setIsControlBarVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsControlBarVisible(true);
    };

    const handleMouseLeave = () => {
        setIsControlBarVisible(false);
    };

    const isFullscreen = false;
    const isBlockingPointerEvents = !!id;

    const isMaster = !id;
    const isOverlaid = !isMaster || isFullscreen;

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
    state => ({

    }),
    {

    },
)(PlayerControlOverlay);

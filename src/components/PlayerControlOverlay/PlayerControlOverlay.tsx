import { connect } from 'react-redux';
import { State } from '../../redux/types';
import { IndividualPlaybackControlBar } from '../IndividualPlaybackControlBar';
import { PlayerControlOverlayContainer, PlaybackControlBarWrapper } from './style';

// TODO: generalize for master player too (for now idk which props this will need).

interface OwnProps {
    id: string;
}

interface StateProps {

}

interface DispatchProps {

}

export type PlayerControlOverlayProps = OwnProps & StateProps & DispatchProps;

const PlayerControlOverlay: React.FC<PlayerControlOverlayProps> = ({ id }) => {

    return (
        <PlayerControlOverlayContainer>
            <PlaybackControlBarWrapper>
                <IndividualPlaybackControlBar id={id} />
            </PlaybackControlBarWrapper>
        </PlayerControlOverlayContainer>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    state => ({

    }),
    {

    },
)(PlayerControlOverlay);

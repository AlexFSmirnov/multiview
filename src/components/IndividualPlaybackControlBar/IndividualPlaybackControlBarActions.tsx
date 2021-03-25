import { connect } from 'react-redux';
import { State } from '../../redux/types';

interface OwnProps {

}

interface StateProps {

}

interface DispatchProps {

}

export type IndividualPlaybackControlBarActionsProps = OwnProps & StateProps & DispatchProps;

const IndividualPlaybackControlBarActions: React.FC<IndividualPlaybackControlBarActionsProps> = ({

}) => {

    return (
        <p>kek</p>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    null,
    {},
)(IndividualPlaybackControlBarActions);

import { IconButton, Tooltip } from '@material-ui/core';
import { VisibilityOff } from '@material-ui/icons';
import { connect } from 'react-redux';
import { State } from '../../redux/types';

interface OwnProps {
    onHide?: () => void;
}

interface StateProps {

}

interface DispatchProps {

}

export type IndividualPlaybackControlBarActionsProps = OwnProps & StateProps & DispatchProps;

const IndividualPlaybackControlBarActions: React.FC<IndividualPlaybackControlBarActionsProps> = ({
    onHide,
}) => {
    const handleHideButtonClick = () => {
        if (onHide) {
            onHide();
        }
    };

    return (
        <>
            <Tooltip title="Hide controls overlay">
                <IconButton size="small" onClick={handleHideButtonClick}>
                    <VisibilityOff fontSize="small" />
                </IconButton>
            </Tooltip>

            <div style={{ width: '8px' }} />
        </>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    null,
    {},
)(IndividualPlaybackControlBarActions);

import { IconButton } from '@material-ui/core';
import { Settings, Fullscreen } from '@material-ui/icons';

// TODO: Connect action buttons to state.
interface StateProps {

}

interface DispatchProps {

}

export type MasterPlaybackControlBarActionsProps = StateProps & DispatchProps;

const MasterPlaybackControlBarActions: React.FC<MasterPlaybackControlBarActionsProps> = ({}) => {

    return (
        <>
            <IconButton size="small">
                <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Settings fontSize="small" />
                </div>
            </IconButton>
            <IconButton size="small">
                <Fullscreen />
            </IconButton>

            <div style={{ width: '4px' }} />
        </>
    );
};

export default MasterPlaybackControlBarActions;

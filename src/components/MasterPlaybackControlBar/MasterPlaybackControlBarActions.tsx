import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IconButton } from '@material-ui/core';
import { Settings, Fullscreen, FullscreenExit } from '@material-ui/icons';
import { State } from '../../redux/types';
import { getIsFullscreen } from '../../redux/selectors';
import { toggleFullscreen } from '../../redux/actions';

interface StateProps {
    isFullscreen: boolean;
}

interface DispatchProps {
    toggleFullscreen: () => void;
}

export type MasterPlaybackControlBarActionsProps = StateProps & DispatchProps;

const MasterPlaybackControlBarActions: React.FC<MasterPlaybackControlBarActionsProps> = ({
    isFullscreen,
    toggleFullscreen,
}) => {

    return (
        <>
            <IconButton size="small">
                <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Settings fontSize="small" />
                </div>
            </IconButton>
            <IconButton size="small" onClick={toggleFullscreen}>
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>

            <div style={{ width: '4px' }} />
        </>
    );
};

export default connect<StateProps, DispatchProps, {}, State>(
    createStructuredSelector({
        isFullscreen: getIsFullscreen,
    }),
    {
        toggleFullscreen,
    },
)(MasterPlaybackControlBarActions);

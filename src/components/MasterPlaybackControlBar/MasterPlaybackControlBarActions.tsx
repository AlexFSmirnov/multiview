import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ClickAwayListener, IconButton } from '@material-ui/core';
import { Settings, Fullscreen, FullscreenExit } from '@material-ui/icons';
import { State } from '../../redux/types';
import { getIsFullscreen } from '../../redux/selectors';
import { toggleFullscreen } from '../../redux/actions';
import MasterPlaybackControlBarSettingsMenu from './MasterPlaybackControlBarSettingsMenu';

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
    const settingsButtonRef = useRef<HTMLButtonElement | null>(null);
    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
    // TODO: Hide settings when the playback bar is hidden.

    const handleSettingsClick = () => setIsSettingsMenuOpen(!isSettingsMenuOpen);

    const settingsMenuProps = {
        isOpen: isSettingsMenuOpen,
        anchorElement: settingsButtonRef.current,
    };

    return (
        <>
            <ClickAwayListener onClickAway={() => setIsSettingsMenuOpen(false)}>
                <div>
                    <IconButton size="small" onClick={handleSettingsClick} ref={settingsButtonRef}>
                        <div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Settings fontSize="small" />
                        </div>
                    </IconButton>
                    <MasterPlaybackControlBarSettingsMenu {...settingsMenuProps} />
                </div>
            </ClickAwayListener>

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

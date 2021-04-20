import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@material-ui/core';
import { VisibilityOff, ArrowUpward, ArrowDownward, CenterFocusWeak, Delete } from '@material-ui/icons';
import { State, Layout } from '../../redux/types';
import { movePlayerToSecondaryPlayers, movePlayerToMainPlayers, makePlayerMain, removeVideo } from '../../redux/actions';
import { getLayout, getIsPlayerMain } from '../../redux/selectors';

interface OwnProps {
    id: string;
    onHide?: () => void;
}

interface StateProps {
    layout: Layout;
    isMainPlayer: boolean;
}

interface DispatchProps {
    movePlayerToMainPlayers: (id: string) => void;
    movePlayerToSecondaryPlayers: (id: string) => void;
    makePlayerMain: (id: string) => void;
    removeVideo: (id: string) => void;
}

export type IndividualPlaybackControlBarActionsProps = OwnProps & StateProps & DispatchProps;

const IndividualPlaybackControlBarActions: React.FC<IndividualPlaybackControlBarActionsProps> = ({
    id,
    onHide,
    layout,
    isMainPlayer,
    movePlayerToMainPlayers,
    movePlayerToSecondaryPlayers,
    makePlayerMain,
    removeVideo,
}) => {
    const [isDeleteConfirmationDialogShown, setIsDeleteConfirmationDialogShown] = useState(false);

    const showDeleteConfirmationDialog = () => setIsDeleteConfirmationDialogShown(true);
    const hideDeleteConfirmationDialog = () => setIsDeleteConfirmationDialogShown(false);

    const handleFocusButtonClick = () => {
        makePlayerMain(id);
    };

    const handleMoveButtonClick = () => {
        if (isMainPlayer) {
            movePlayerToSecondaryPlayers(id);
        } else {
            movePlayerToMainPlayers(id);
        }
    };

    const handleHideButtonClick = () => {
        if (onHide) {
            onHide();
        }
    };

    const handleDeleteButtonClick = () => {
        removeVideo(id);
    };

    return (
        <>
            {((layout === Layout.Focused || layout === Layout.Overlay) && !isMainPlayer) ? (
                <>
                    <Tooltip title="Focus">
                        <IconButton size="small" onClick={handleFocusButtonClick}>
                            <CenterFocusWeak fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <div style={{ width: '4px' }} />
                </>
            ) : null}

            {layout === Layout.Focused ? (
                <>
                    <Tooltip title={isMainPlayer ? 'Move down' : 'Move up'}>
                        <IconButton size="small" onClick={handleMoveButtonClick}>
                            {isMainPlayer ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                    <div style={{ width: '4px' }} />
                </>
            ) : null}
            <Tooltip title="Hide controls overlay">
                <IconButton size="small" onClick={handleHideButtonClick}>
                    <VisibilityOff fontSize="small" />
                </IconButton>
            </Tooltip>
            <div style={{ width: '4px' }} />
            <Tooltip title="Remove video">
                <IconButton size="small" onClick={showDeleteConfirmationDialog}>
                    <Delete fontSize="small" />
                </IconButton>
            </Tooltip>

            <div style={{ width: '8px' }} />

            <Dialog open={isDeleteConfirmationDialogShown}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this video?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={hideDeleteConfirmationDialog} color="default">Cancel</Button>
                        <Button onClick={handleDeleteButtonClick} color="primary" variant="contained">Delete</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, State>(
    (state, ownProps) => ({
        layout: getLayout(state),
        isMainPlayer: getIsPlayerMain(ownProps.id)(state),
    }),
    {
        movePlayerToMainPlayers,
        movePlayerToSecondaryPlayers,
        makePlayerMain,
        removeVideo,
    },
)(IndividualPlaybackControlBarActions);

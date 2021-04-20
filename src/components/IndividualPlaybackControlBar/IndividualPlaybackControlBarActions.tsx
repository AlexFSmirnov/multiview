import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@material-ui/core';
import { VisibilityOff, ArrowBack, ArrowForward, ArrowUpward, ArrowDownward, CenterFocusWeak, Delete, Settings } from '@material-ui/icons';
import { State, Layout } from '../../redux/types';
import { movePlayerToSecondaryPlayers, movePlayerToMainPlayers, makePlayerMain, movePlayerLeft, movePlayerRight, removeVideo } from '../../redux/actions';
import { getLayout, getIsPlayerMain, canMovePlayerLeft, canMovePlayerRight } from '../../redux/selectors';

interface OwnProps {
    id: string;
    onHide?: () => void;
    dense?: boolean;
}

interface StateProps {
    layout: Layout;
    isMainPlayer: boolean;
    canMoveLeft: boolean;
    canMoveRight: boolean;
}

interface DispatchProps {
    movePlayerToMainPlayers: (id: string) => void;
    movePlayerToSecondaryPlayers: (id: string) => void;
    makePlayerMain: (id: string) => void;
    movePlayerLeft: (id: string) => void;
    movePlayerRight: (id: string) => void;
    removeVideo: (id: string) => void;
}

export type IndividualPlaybackControlBarActionsProps = OwnProps & StateProps & DispatchProps;

const IndividualPlaybackControlBarActions: React.FC<IndividualPlaybackControlBarActionsProps> = ({
    id,
    onHide,
    dense,
    layout,
    isMainPlayer,
    canMoveLeft,
    canMoveRight,
    movePlayerToMainPlayers,
    movePlayerToSecondaryPlayers,
    makePlayerMain,
    movePlayerLeft,
    movePlayerRight,
    removeVideo,
}) => {
    const settingsButtonRef = useRef<HTMLButtonElement | null>(null);

    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
    const [isDeleteConfirmationDialogShown, setIsDeleteConfirmationDialogShown] = useState(false);

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
        setIsDeleteConfirmationDialogShown(true);
    };

    const handleSettingsButtonClick = () => {
        setIsSettingsMenuOpen(true);
    };

    const handleSettingsMenuHide = () => {
        setIsSettingsMenuOpen(false);
    };

    const handleCancelDeletionButtonClick = () => {
        setIsDeleteConfirmationDialogShown(false);
    };

    const handleConfirmDeletionButtonClick = () => {
        removeVideo(id);
    };

    const actions = [
        {
            isShown: (layout === Layout.Focused || layout === Layout.Overlay) && !isMainPlayer,
            title: 'Focus',
            icon: <CenterFocusWeak fontSize="small" />,
            onClick: handleFocusButtonClick,
        },
        {
            isShown: canMoveLeft,
            title: 'Move left',
            icon: <ArrowBack fontSize="small" />,
            onClick: () => movePlayerLeft(id),
        },
        {
            isShown: layout === Layout.Focused,
            title: isMainPlayer ? 'Move down' : 'Move up',
            icon: isMainPlayer ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />,
            onClick: handleMoveButtonClick,
        },
        {
            isShown: canMoveRight,
            title: 'Move right',
            icon: <ArrowForward fontSize="small" />,
            onClick: () => movePlayerRight(id),
        },
        {
            isShown: true,
            title: 'Hide controls overlay',
            icon: <VisibilityOff fontSize="small" />,
            onClick: handleHideButtonClick,
        },
        {
            isShown: true,
            title: 'Remove video',
            icon: <Delete fontSize="small" />,
            onClick: handleDeleteButtonClick,
        },
    ];

    return (
        <>
            {dense ? (
                <>
                    <IconButton size="small" ref={settingsButtonRef} onClick={handleSettingsButtonClick}>
                        <Settings fontSize="small" />
                    </IconButton>
                    <div style={{ width: '4px' }} />

                    <Menu anchorEl={settingsButtonRef.current} open={isSettingsMenuOpen} onClose={handleSettingsMenuHide} onClick={handleSettingsMenuHide}>
                        {actions.map(({ isShown, title, icon, onClick }) => isShown ? (
                            <MenuItem dense key={title} onClick={onClick}>
                                <ListItemIcon>
                                    {icon}
                                </ListItemIcon>
                                <Typography variant="body1">{title}</Typography>
                            </MenuItem>
                        ) : null)}
                    </Menu>
                </>
            ) : (
                actions.map(({ isShown, title, icon, onClick }) => isShown ? (
                    <div key={title}>
                        <Tooltip title={title}>
                            <IconButton size="small" onClick={onClick}>
                                {icon}
                            </IconButton>
                        </Tooltip>
                        <div style={{ width: '4px' }} />
                    </div>
                ) : null)
            )}

            <div style={{ width: '4px' }} />

            <Dialog open={isDeleteConfirmationDialogShown}>
                <DialogTitle>Confirm deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this video?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleCancelDeletionButtonClick} color="default">Cancel</Button>
                        <Button onClick={handleConfirmDeletionButtonClick} color="primary" variant="contained">Delete</Button>
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
        canMoveLeft: canMovePlayerLeft(ownProps.id)(state),
        canMoveRight: canMovePlayerRight(ownProps.id)(state),
    }),
    {
        movePlayerToMainPlayers,
        movePlayerToSecondaryPlayers,
        makePlayerMain,
        movePlayerLeft,
        movePlayerRight,
        removeVideo,
    },
)(IndividualPlaybackControlBarActions);

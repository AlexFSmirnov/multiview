import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AppBar as MaterialAppBar, Button, Slide, Toolbar, Typography } from '@material-ui/core';
import { ViewQuilt } from '@material-ui/icons';
import { State } from '../../redux/types';
import { getIsFullscreen } from '../../redux/selectors';

interface OwnProps {
    onAddVideosClick?: () => void;
}

interface StateProps {
    isFullscreen: boolean;
}

export type AppBarProps = OwnProps & StateProps;

const AppBar: React.FC<AppBarProps> = ({ onAddVideosClick, isFullscreen }) => {
    const handleAddVideosClick = () => {
        if (onAddVideosClick) {
            onAddVideosClick();
        }
    };

    if (isFullscreen) {
        return null;
    }

    return (
        <Slide in={!isFullscreen}>
            <MaterialAppBar position="static" color="inherit">
                <Toolbar variant="dense">
                    <ViewQuilt />
                    <div style={{ width: '12px' }} />
                    <Typography variant="h6">
                        Multiview
                    </Typography>
                    <div style={{ flex: 1 }} />
                    <Button variant="outlined" color="default" onClick={handleAddVideosClick}>Add videos</Button>
                </Toolbar>
            </MaterialAppBar>
        </Slide>
    );
};

export default connect<StateProps, {}, OwnProps, State>(
    createStructuredSelector({
        isFullscreen: getIsFullscreen,
    })
)(AppBar);

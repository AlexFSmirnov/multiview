import { AppBar as MaterialAppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { ViewQuilt } from '@material-ui/icons';

interface AppBarProps {
    onAddVideosClick?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onAddVideosClick }) => {
    const handleAddVideosClick = () => {
        if (onAddVideosClick) {
            onAddVideosClick();
        }
    };

    return (
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
    );
};

export default AppBar;

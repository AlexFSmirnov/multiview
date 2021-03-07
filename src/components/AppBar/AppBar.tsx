import { AppBar as MaterialAppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { ViewQuilt } from '@material-ui/icons';

interface AppBarProps {
    onAddVideoClick?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ onAddVideoClick }) => {
    const handleAddVideoClick = () => {
        if (onAddVideoClick) {
            onAddVideoClick();
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
                <Button variant="contained" color="primary" onClick={handleAddVideoClick}>Add video</Button>
            </Toolbar>
        </MaterialAppBar>
    );
};

export default AppBar;

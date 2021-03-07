import { AppBar as MaterialAppBar, Toolbar, Typography } from '@material-ui/core';
import { ViewQuilt } from '@material-ui/icons';

interface AppBarProps {

}

const AppBar: React.FC<AppBarProps> = ({}) => {

    return (
        <MaterialAppBar position="static" color="inherit">
            <Toolbar variant="dense">
                <ViewQuilt />
                <div style={{ width: '12px' }} />
                <Typography variant="h6">
                    Multiview
                </Typography>
            </Toolbar>
        </MaterialAppBar>
    );
};

export default AppBar;

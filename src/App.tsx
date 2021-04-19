import { useState } from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { AddVideosDialog, AppBar, PlayerControlOverlay, KeyboardEventHandler, PlayersView } from './components';
import { AppContainer, GlobalStyle } from './style';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: red['700'],
            light: red['A700'],
        },
    },
});

const App: React.FC = () => {
    const [isAddVideosDialogOpen, setIsAddVideosDialogOpen] = useState(true);

    const openAddVideosDialog = () => setIsAddVideosDialogOpen(true);
    const closeAddVideosDialog = () => setIsAddVideosDialogOpen(false);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <KeyboardEventHandler isActive={!isAddVideosDialogOpen} />
            <AppContainer>
                <AppBar onAddVideosClick={openAddVideosDialog} />
                <PlayersView />
                <PlayerControlOverlay />
            </AppContainer>
            <AddVideosDialog open={isAddVideosDialogOpen} onClose={closeAddVideosDialog} />
        </ThemeProvider>
    );
};

export default App;

import { useState } from 'react';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { AddVideosDialog, AppBar, PlaybackControlBar, VideoGridView } from './components';
import { AppContainer, GlobalStyle } from './style';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: red['700'],
        },
    },
});


const App = () => {
    const [isAddVideosDialogOpen, setIsAddVideosDialogOpen] = useState(true);

    const openAddVideosDialog = () => setIsAddVideosDialogOpen(true);
    const closeAddVideosDialog = () => setIsAddVideosDialogOpen(false);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <AppContainer>
                <AppBar onAddVideosClick={openAddVideosDialog} />
                <VideoGridView padding={8} />
                <PlaybackControlBar />
            </AppContainer>
            <AddVideosDialog open={isAddVideosDialogOpen} onClose={closeAddVideosDialog} />
        </ThemeProvider>
    );
};

export default App;

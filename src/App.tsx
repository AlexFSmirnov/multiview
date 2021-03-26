import { useState } from 'react';
import { connect } from 'react-redux';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { State } from './redux/types';
import { Video } from './redux/actions/videos';
import { AddVideosDialog, AppBar, PlayerControlOverlay, VideoGridView } from './components';
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

interface StateProps {
    videos: Record<string, Video>;
}

const App: React.FC<StateProps> = ({ videos }) => {
    const [isAddVideosDialogOpen, setIsAddVideosDialogOpen] = useState(true);

    const openAddVideosDialog = () => setIsAddVideosDialogOpen(true);
    const closeAddVideosDialog = () => setIsAddVideosDialogOpen(false);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <AppContainer>
                <AppBar onAddVideosClick={openAddVideosDialog} />
                <VideoGridView videos={videos} padding={8} />
                <PlayerControlOverlay />
            </AppContainer>
            <AddVideosDialog open={isAddVideosDialogOpen} onClose={closeAddVideosDialog} />
        </ThemeProvider>
    );
};

export default connect(
    (state: State) => ({
        videos: state.videos,
    }),
)(App);

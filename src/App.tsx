import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Layout, State, Video } from './redux/types';
import { getLayout, getVideos } from './redux/selectors';
import { AddVideosDialog, AppBar, PlayerControlOverlay, VideoGridView, KeyboardEventHandler, VideoFocusedView } from './components';
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
    layout: Layout;
}

export type AppProps = StateProps;

const App: React.FC<StateProps> = ({ videos, layout }) => {
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
                {layout === Layout.Grid ? (
                    <VideoGridView videos={videos} padding={8} />
                ) : (
                    <VideoFocusedView videos={videos} padding={8} />
                )}
                <PlayerControlOverlay />
            </AppContainer>
            <AddVideosDialog open={isAddVideosDialogOpen} onClose={closeAddVideosDialog} />
        </ThemeProvider>
    );
};

export default connect<StateProps, {}, {}, State>(
    createStructuredSelector({
        videos: getVideos,
        layout: getLayout,
    }),
)(App);

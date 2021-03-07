import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { AppBar, PlaybackControlBar, VideoGridView } from './components';
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

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <AppContainer>
                <AppBar />
                <VideoGridView />
                <PlaybackControlBar />
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;

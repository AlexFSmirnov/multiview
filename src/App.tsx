import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { AppBar, PlaybackControlBar } from './components';
import { AppContainer, GlobalStyle } from './style';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});


const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <AppContainer>
                <AppBar />
                <PlaybackControlBar />
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;

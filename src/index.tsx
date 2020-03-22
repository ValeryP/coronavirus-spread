import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

ReactGA.initialize("UA-160685541-1");
ReactGA.pageview(window.location.pathname);


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#354955',
        },
        secondary: {
            main: '#F7A942',
        },
    },
});
ReactDOM.render(<ThemeProvider theme={theme}><App/></ThemeProvider>,
    document.getElementById('root'));

document.body.style.margin = '0';

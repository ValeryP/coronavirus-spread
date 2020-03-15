import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

ReactGA.initialize("UA-160685541-1");
ReactGA.pageview(window.location.pathname);

const theme = createMuiTheme();
ReactDOM.render(<ThemeProvider theme={theme}><App/></ThemeProvider>,
    document.getElementById('root'));

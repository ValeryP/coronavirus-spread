import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme();

ReactDOM.render(<ThemeProvider theme={theme}><App/></ThemeProvider>,
    document.getElementById('root'));

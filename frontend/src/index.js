import React from 'react';
import GlobalStyle from './globalStyle';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
        <GlobalStyle></GlobalStyle>
    </Provider>,
    document.getElementById('root')
);

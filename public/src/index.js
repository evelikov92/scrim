import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Application from './containers/Application';
import store from './store';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import { setBeginningSettings } from "./utils/common";
setBeginningSettings();

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('app')
);

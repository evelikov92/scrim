import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Application from '../../public/src/containers/Application';
import store from '../../public/src/store';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import { setBeginningSettings } from "../../public/src/utils/common";
setBeginningSettings();

console.log('BLAH');

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('app')
);

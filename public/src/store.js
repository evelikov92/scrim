import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import Promise from 'redux-promise';
import logger from 'redux-logger';
import reducers from './reducers';

const store = applyMiddleware(thunk, Promise, logger)(createStore);
export default store(reducers);

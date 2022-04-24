import { combineReducers } from 'redux'
import { LOG_OUT } from "../actions/types";
import { reducer as formReducer } from 'redux-form';

import account from './account';
import error from './error';
import language from './language';

const appReducer = combineReducers({
    form: formReducer,
    account,
    error,
    language,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        const { strings, language } = state;
        state = { };

        state.strings = strings;
        state.language = language;
    }
    return appReducer(state, action);
};

export default rootReducer;

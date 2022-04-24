import axios from 'axios';
import { APP_LINK } from '../utils/common';
import { checkLanguageSupport } from '../utils/language';

import {
    ADD_ERROR,
    REMOVE_ERROR,
    GET_LANGUAGE,
    SET_LANGUAGE,
    GET_LANGUAGE_RESOURCES
} from './types';

/**
 * Get the user language
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getLanguage = (finish) => async (dispatch) => {
    try {
        let { data: { lang } } = await axios.get(`${APP_LINK}get-language`);

        lang = checkLanguageSupport(lang);
        window.localStorage.setItem('lang', lang);

        dispatch({ type: GET_LANGUAGE, lang });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

/**
 * Set the user language
 * @param {String} lang The user language key
 * @param {Function} finish Action which will execute when the request is finish
 */
export const setLanguage = (lang, finish) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}set-language`, { lang });

        window.localStorage.setItem('lang', lang);

        // Set resources on the user language
        dispatch({ type: GET_LANGUAGE_RESOURCES, lang: response.data.lang, payload: response.data.resources });
        dispatch({ type: SET_LANGUAGE, lang: response.data.lang });
        dispatch({ type: REMOVE_ERROR });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

/**
 * Get the language resources from the server for user language
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getResources = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}get-resources`);
        const lang = window.localStorage.getItem('lang');

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LANGUAGE_RESOURCES, lang, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

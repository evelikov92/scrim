import axios from 'axios';
import { APP_LINK } from '../utils/common';

import {
    GET_LOGGED_USER,
    LOG_IN,
    LOG_OUT,
    ADD_ERROR,
    REMOVE_ERROR, REGISTRATION
} from './types';

/**
 * Send request to the server to check do username which user is enter is used from another account
 * @param {String} username The username which user is enter on input field
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const checkUsername = (username, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}account/check-username-exist`, { username });

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Send request to the server to check do email which user is enter is used from another account
 * @param {String} Email The email which user is enter on input field
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const checkEmail = (Email, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}account/check-email-exist`, { Email });

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Activate the account on the system
 * @param {Function} success Action which will execute if request is success
 * @param {String} token Token which will found the user who need to activate the account
 */
export const activateAccount = (success, token) => async (dispatch) => {
    try {
        await axios.get(`${APP_LINK}account/activate/${token}`);

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch (err) {
        dispatch({ type: REMOVE_ERROR });
    }
};

/**
 * Login to the system
 * @param {Object} user Username and password to send to server for authentication
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const login = (user, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}account/login`, user);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: LOG_IN, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Register new user on the system
 * @param {Object} user The information for create new user account (possible from administrator only)
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const registration = (user, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}account/registration`, user);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LOGGED_USER, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Log out from the system
 */
export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}account/logout`);

        dispatch({ type: LOG_OUT });

    } catch ({ response: { status, statusText, data } }) {
       dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

/**
 * Get logged user for can show the correct layout/navigation and check do have right to be on that page
 * @param finish Action which will execute when the request is finish
 */
export const getLoggedUser = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}account/get-logged-user`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LOGGED_USER, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Send request to server for can user set new password
 * @param {Object} data The information which will send to the server for send email for can set new password later
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const askForNewPassword = (data, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}account/forgot-password`, data);

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * User set new password for him account
 * @param {Object} data New password of the user with verified token for can show is he
 * @param {String} token Authentication token of the user
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const setNewPassword = (data, token, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}account/set-password/${token}`, data);

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

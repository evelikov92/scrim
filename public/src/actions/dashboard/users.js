import axios from 'axios';
import { APP_LINK } from '../../../../public/src/utils/common';

import {
    GET_ALL_USERS,
    ADD_ERROR,
    GET_USER,
    DELETE_USER,
    UPDATE_USER,
    OPEN_USER,
    REMOVE_USERS,
    GET_ALL_EMAILS
} from '../../../../public/src/actions/types';

export const getAllClientEmails = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}get-emails`);

        dispatch({ type: GET_ALL_EMAILS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get all users from the server and store it on browser
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getAllUsers = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}users/all`);

        dispatch({ type: GET_ALL_USERS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get profile of specific user by id
 * @param {Number} id The id of the user
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getUser = (id, finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}user/get/${id}`);

        dispatch({ type: GET_USER, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Update the user information (possible only administrator)
 * @param {Object} user The information which is for update the user
 * @param {Number} index The index of the users array
 * @param {Function} success Action which will execute when the request is success
 * @param {Function} failed Action which will execute when the request is failed
 */
export const updateUser = (user, index, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}user/edit/${user.id}`, user);

        dispatch({ type: UPDATE_USER, payload: response.data, index });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Open the user to show on the browser
 * @param {Number} index The index of the users array
 * @param {Function} finish Action which will execute when the request is finish
 */
export const openUser = (index, finish) => async (dispatch) => {
    dispatch({ type: OPEN_USER, index });
    finish();
};

/**
 * Delete the user from the system
 * @param {Number} id The id of the user which will send to server for delete from the system
 * @param {Number} index The index of the users array for can on reducer remove from the array
 * @param {Boolean} status The status of the user active/disabled
 * @param {Function} finish Action which will execute when the request is finish
 */
export const deleteUser = (id, index, status, finish) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}user/remove/${id}`, { status });

        dispatch({ type: DELETE_USER, index, status });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Clear the users from memory. For security issues
 */
export const clearAllUsers = () => async (dispatch) => {
    dispatch({ type: REMOVE_USERS });
};
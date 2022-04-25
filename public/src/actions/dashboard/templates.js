import axios from 'axios';
import { APP_LINK } from '../../../../public/src/utils/common';

import {
    ADD_TEMPLATE_MESSAGE,
    EDIT_TEMPLATE_MESSAGE,
    GET_ALL_TEMPLATE_MESSAGES,
    GET_TEMPLATE_MESSAGE,
    OPEN_TEMPLATE_MESSAGE,
    ADD_ERROR,
    REMOVE_ERROR
} from '../../../../public/src/actions/types';

/**
 * Get all templates from Server and store it on browser
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getAll = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}templates/all`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_ALL_TEMPLATE_MESSAGES, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Open specific RMA Note Message Template
 * @param {Number} index The index on Message Template array
 * @param {Function} finish Action which will execute when the request is finish
 */
export const open = (index, finish) => async (dispatch) => {
    dispatch({ type: OPEN_TEMPLATE_MESSAGE, index });
    finish();
};

/**
 * Get the Message Template from the server and store it on browser
 * @param {Number} id The id of the Message Template
 * @param {Function} finish Action which will execute when the request is finish
 */
export const get = (id, finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}templates/get/${id}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_TEMPLATE_MESSAGE, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 *
 * @param {Number} id The id of the Message Template
 * @param {Object} template The information which is for update the Message RMA note template
 * @param {Function} success Action which will execute when the request is success
 * @param {Function} failed Action which will execute when the request is failed
 */
export const update = (id, template, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}templates/edit/${id}`, template);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: EDIT_TEMPLATE_MESSAGE, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Send to server new template message for RMA notes
 * @param {Object} template The information which is for create new Message RMA note template
 * @param {Function} success Action which will execute when the request is success
 * @param {Function} failed Action which will execute when the request is failed
 */
export const add = (template, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}templates/add`, template);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ADD_TEMPLATE_MESSAGE, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

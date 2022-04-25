import axios from 'axios';
import { APP_LINK } from '../../../public/src/utils/common';

import {
    GET_RMA_STATUS,
    CLEAR_RMA_STATUS,
    REMOVE_ERROR,
    ADD_ERROR,
    CLEAR_PRODUCT,
    GET_RMA_PDF_FILE
} from '../../../public/src/actions/types';

/**
 * Get the RMA Items from the server and show the client the status of any rma item
 * @param {Object} data Email and Rma number put it from client
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getRmaStatus = (data, finish) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}rma/check`, { ...data, number: data.number || 0, email: data.email || '' });

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_RMA_STATUS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
        dispatch({ type: CLEAR_RMA_STATUS });

        finish();
    }
};

/**
 * Clear the RMA object from store
 * @returns {{type: string}} String for reducer
 */
export const clearRmaStatus = () => ({ type: CLEAR_RMA_STATUS });

/**
 * Create the RMA and return their number for can show it to client
 * @param {Function} finish Action which will execute when the request is finish
 */
export const createRmaNumber = (finish) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}rma/create-number`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_RMA_STATUS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Create the Rma document
 * @param {Number} number The id of the new created RMA
 * @param {Object} data Rma items which will add on the RMA document
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const createRma = (data, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}rma/create`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: CLEAR_PRODUCT });

        success(response.data.number);
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Create client for the RMA document
 * @param {Object} client RMA Registration form for client
 * @param {Number} number The id of the new created RMA
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const createClient = (client, number, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}rma/create-client/${number}`, client);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_RMA_PDF_FILE, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Check do that user can create that RMA
 * @param {Number} number The id of the new created RMA
 * @param {Function} finish Action which will execute when the request is finish
 */
export const checkClient = (number, finish) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}rma/check-client`, { number });

        dispatch({ type: REMOVE_ERROR });

        response.data !== 1 && finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Save the user feedback on the server
 * @param {Number} id The id of the RMA
 * @param {Number} vote Vote the RMA service from 0-9
 * @param {Function} finish Action which will execute when the request is finish
 */
export const sendFeedback = (id, vote, finish) => async (dispatch) => {
    try {
        await axios.get(`${APP_LINK}rma/feedback/voting/${vote}/rma/${id}`);

        dispatch({ type: REMOVE_ERROR });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

/**
 * Send feedback message to the system
 * @param {Number} rma The RMA id
 * @param {Number} message Feedback message from the client
 * @param {Function} finish Action which will execute when the request is finish
 */
export const sendFeedbackMessage = (rma, message, finish) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}rma/feedback/message`, { rma, message });

        dispatch({ type: REMOVE_ERROR });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

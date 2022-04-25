import axios from 'axios';
import { APP_LINK, generateQueryString } from '../../../../public/src/utils/common';

import {
    REMOVE_ERROR,
    ADD_ERROR,
    GET_LIST_OF_RMA,
    GET_RMA,
    UPDATE_RMA_STATUS,
    GET_RMA_ITEMS,
    GET_ALL_USER_FEEDBACK
} from '../../../../public/src/actions/types';

export const getAllFeedback = (finish, page = 1, itemsPerPage = 10) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}rma/get-feedback/page/${page}/items/${itemsPerPage}`);

        dispatch({ type: GET_ALL_USER_FEEDBACK, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get RMA with their Items
 * @param {Number} id RMA Number
 * @param {Function} finish Remove the spinner after load the data for RMA
 */
export const getActiveRMA = (id, finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}rma/get/${id}`);
        const { items, ...rma } = response.data;

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_RMA, payload: rma });
        dispatch({ type: GET_RMA_ITEMS, payload: items });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Update the Status of all RMA items
 * @param {array} data The information which is for update the RMA
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const updateRmaItemStatus = (data, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}rma/update`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: UPDATE_RMA_STATUS });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

export const getRmaByCategory = (category, finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}rma/search/by-category/${category}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LIST_OF_RMA, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

export const getRmaBySerialNumber = (serialNumber, finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}rma/search/by-product/${serialNumber}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LIST_OF_RMA, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get all RMA separated by page
 * @param {Function} finish Action which will execute when the request is finish
 * @param {Number} page Which page is show on browser
 * @param {Number} itemsPerPage How many items is show for one page
 */
export const getAllRMAItems = (finish, page = 1, itemsPerPage = 10) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}rma/list/page/${page}/items/${itemsPerPage}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LIST_OF_RMA, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get all founded RMA separated by page, and sort by specific requirements
 * @param {Function} finish Action which will execute when the request is finish
 * @param {Object} search Object which have data about search requirements of the user
 * @param {Object} sort Object which have data about order requirements of the user
 * @param {Number} page Which page is show on browser
 * @param {Number} itemsPerPage How many items is show for one page
 */
export const search = (finish, search, sort, page = 1, itemsPerPage = 10) => async (dispatch) => {
    try {
        // Get search query as string and add 'e' on the beginning of the key for can separate from order query string
        const searchQuery = generateQueryString(search, 'e');
        let query = '';

        if (searchQuery) {
            // Generate query string for url and include search query
            query = `${generateQueryString(sort, 'o')}&${searchQuery}`;
        } else {
            // Generate query string for url
            query = generateQueryString(sort, 'o');
        }

        let response = { };
        if (query) {
            response = await axios.get(`${APP_LINK}rma/search/page/${page}/items/${itemsPerPage}?${query}`);
        } else {
            response = await axios.get(`${APP_LINK}rma/search/page/${page}/items/${itemsPerPage}`);
        }

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_LIST_OF_RMA, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

import axios from 'axios';
import { APP_LINK, generateQueryString } from '../../../../public/src/utils/common';

import {
    GET_ALL_WARRANTY_PRODUCTS,
    GET_ACTIVE_PRODUCT,
    REMOVE_ERROR,
    ADD_ERROR
} from '../../../../public/src/actions/types';

/**
 * Get the product and store it on the browser
 * @param {Number} id The id of the product
 * @param {Function} finish Action which will execute when the request is finish
 */
export const get = (id, finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}/products/get/${id}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_ACTIVE_PRODUCT, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 *
 * @param {Object} data Product information which will activate/deactivate the warranty
 * @param {Number} id The id of the product which will activate/deactivate warranty
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const update = (data, id, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}products/update/${id}`, data);

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Get all Products separated by pages
 * @param {Function} finish Action which will execute when the request is finish
 * @param {Number} page Which page is show on browser
 * @param {Number} itemsPerPage How many items is show for one page
 */
export const getAll = (finish, page = 1, itemsPerPage = 10) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}products/list/page/${page}/items/${itemsPerPage}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_ALL_WARRANTY_PRODUCTS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get all founded Products separated by page, and sort by specific requirements
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
            // Generate query string for url and include search query
            query = generateQueryString(sort, 'o');
        }

        let response = { };
        if (query) {
            response = await axios.get(`${APP_LINK}products/search/page/${page}/items/${itemsPerPage}?${query}`);
        } else {
            response = await axios.get(`${APP_LINK}products/search/page/${page}/items/${itemsPerPage}`);
        }

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_ALL_WARRANTY_PRODUCTS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

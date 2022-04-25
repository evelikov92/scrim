import axios from 'axios';
import { APP_LINK, generateQueryString } from '../../../../public/src/utils/common';

import {
    REMOVE_ERROR,
    ADD_ERROR,
    TOGGLE_WHOLESALE_STATUS,
    LIST_ALL_WHOLESALES,
    CLEAR_WHOLESALER_POSITION,
    GET_ACTIVE_WHOLESALER,
    GET_WHOLESALER_POSITION,
    EDIT_WHOLESALER_PROFILE
} from '../../../../public/src/actions/types';

/**
 * Activate/Deactivate the Wholesaler account on the system
 * @param {Number} id The id of the wholesaler
 * @param {Number} index The index of the wholesaler on wholesalers array on reducer
 * @param {Boolean} status The new status of the wholesaler. Do is active or is disabled
 * @param {Function} callback Action which will execute when the request is finish
 */
export const toggleState = (id, index, status, callback) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}wholesaler/status`, { id, status: status || 0 });

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: TOGGLE_WHOLESALE_STATUS, index, status });

        callback();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        callback();
    }
};

/**
 * Get all Wholesalers/Shops separated by page
 * @param {Function} finish Action which will execute when the request is finish
 * @param {Number} page Which page is show on browser
 * @param {Number} itemsPerPage How many items is show for one page
 */
export const getAll = (finish, page = 1, itemsPerPage = 10) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}wholesaler/list/page/${page}/items/${itemsPerPage}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: LIST_ALL_WHOLESALES, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get all founded Wholesalers/Shops separated by page, and sort by specific requirements
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
            response = await axios.get(`${APP_LINK}wholesaler/search/page/${page}/items/${itemsPerPage}?${query}`);
        } else {
            response = await axios.get(`${APP_LINK}wholesaler/search/page/${page}/items/${itemsPerPage}`);
        }

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: LIST_ALL_WHOLESALES, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Clear wholesaler location for some reason
 */
export const clearWholesalerLocation = () => ({ type: CLEAR_WHOLESALER_POSITION });

/**
 * Get the position of the wholesaler on google map
 * @param {String} address The address of the Shop + City + Country
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getWholesalerPosition = (address, finish) => async (dispatch) => {
    try {
        // delete axios.defaults.headers.common['X-Requested-With'];
        // delete axios.defaults.headers.common['x_csrf_token_id'];
        // delete axios.defaults.headers.common['x_csrf_token_val'];
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBJ72F2QfV76LODYPdSNQeulvNNFW5DOjw`);
        // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_WHOLESALER_POSITION, payload: response.data.results[0].geometry.location });

        finish();
    } catch (err) {
        finish(err);
    }
};

/**
 * Show the wholesaler account information
 * @param {Number} id The id of the Shop account
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getActiveWholesaler = (id, finish) => async (dispatch) => {
    const response = await axios.get(`${APP_LINK}/wholesaler/get/${id}`);

    dispatch({ type: REMOVE_ERROR });
    dispatch({ type: GET_ACTIVE_WHOLESALER, payload: response.data });

    finish();
};

export const editWholesalerAccount = (id, data, finish) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}wholesaler/edit-shop-profile/${id}`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: EDIT_WHOLESALER_PROFILE, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

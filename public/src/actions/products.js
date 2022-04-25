import axios from 'axios';
import { APP_LINK, generateQueryString } from '../../../public/src/utils/common';

import {
    GET_SLIDER_PRODUCTS,
    ADD_ERROR,
    REMOVE_ERROR,
    GET_CATEGORIES
} from '../../../public/src/actions/types';

// IS NOT USED
export const getSliderProducts = () => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}products/get-slider-products`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_SLIDER_PRODUCTS, payload: response.data });
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
    }
};

/**
 * Get all Product Categories separated by pages
 * @param {Function} finish Action which will execute when the request is finish
 * @param {Number} page Which page is show on browser
 * @param {Number} itemsPerPage How many items is show for one page
 */
export const getAllCategories = (finish, page = 1, itemsPerPage = 10) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}categories/all/page/${page}/items/${itemsPerPage}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_CATEGORIES, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Get all founded Product Categories separated by page, and sort by specific requirements
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
            response = await axios.get(`${APP_LINK}categories/search/page/${page}/items/${itemsPerPage}?${query}`);
        } else {
            response = await axios.get(`${APP_LINK}categories/search/page/${page}/items/${itemsPerPage}`);
        }

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_CATEGORIES, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

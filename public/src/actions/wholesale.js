import axios from 'axios';
import { APP_LINK } from '../../../public/src/utils/common';

import {
    REMOVE_ERROR,
    ADD_ERROR,
    GET_CLIENT_INFORMATION,
    LOG_IN,
	GET_ALL_STATISTICS,
    EDIT_OWN_PROFILE,
    GET_OWN_PROFILE
} from '../../../public/src/actions/types';

/**
 * Create the shop account
 * @param {Object} user The user information which need for create Shop account
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const createWholesaleUser = (user, success, failed) => async (dispatch) => {
    try {
        await axios.post(`${APP_LINK}wholesaler/create`, user);

        dispatch({ type: REMOVE_ERROR });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Try to get logged shop account. Is used when is need to create client for RMA
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const getLoggedWholesaler = (success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}wholesaler/get-logged-shop`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_CLIENT_INFORMATION, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Try to login in the system as a shop for can get the information for create RMA client
 * @param {Object} user Username and password of the Shop
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const logInAsShop = (user, success, failed) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${APP_LINK}wholesaler/login`, user);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: LOG_IN, payload: data.user });
        dispatch({ type: GET_CLIENT_INFORMATION, payload: data.client });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Get the statistic for the Produce/Returned GSE products
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getStatistics = (finish) => async (dispatch) => {
	try {
        const response = await axios.get(`${APP_LINK}products/get-statistic`);

        dispatch({ type: REMOVE_ERROR });
		dispatch({ type: GET_ALL_STATISTICS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

export const checkVat = (vat, finish) => async (dispatch) => {
    try {
        // TODO check for vat do is valid
        const response = await axios.get(`http://apilayer.net/api/validate?access_key=219386a761b0e8a83433fc4adc83b75a&vat_number=${vat}`);

        // const key = '2abe74aceb7aa6ec5ff5a2c440c6ede4';
        // // // TODO check for vat do is valid
        // const response = await axios.get(`https://api.vatsense.com/1.0/validate?vat_number=${vat}&user=${key}`);

        dispatch({ type: REMOVE_ERROR });

        finish(response.data);
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish(null);
    }
};

export const getAccount = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}wholesaler/profile`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_OWN_PROFILE, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

export const editAccount = (data, finish) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}wholesaler/profile`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: EDIT_OWN_PROFILE, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

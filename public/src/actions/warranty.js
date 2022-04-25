import axios from 'axios';
import { APP_LINK } from '../../../public/src/utils/common';

import {
    ADD_ERROR,
    REMOVE_ERROR,
    ACTIVATE_PRODUCT,
    DEACTIVATE_PRODUCT,
    CHECK_PRODUCT_EXIST,
    CLEAR_PRODUCT,
    LOG_IN
} from '../../../public/src/actions/types';

/**
 * Check the state of the product do is active or not
 * @param {Number} serialNumber The serial number of the product
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 * @param {String} recaptcha The google recaptcha response string
 */
export const checkSerialNumber = (serialNumber, success, failed, recaptcha) => async dispatch => {
    try {
        let response = null;
        if (recaptcha) {
            response = await axios.post(`${APP_LINK}warranty/check/${serialNumber.trim()}`, { recaptcha });
        } else {
            response = await axios.post(`${APP_LINK}warranty/check/${serialNumber.trim()}`);
        }

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: CHECK_PRODUCT_EXIST, payload: response.data });

        success(response.data);
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
        dispatch({ type: CLEAR_PRODUCT });

        failed();
    }
};

/**
 * Activate the product for 2 years
 * @param {Object} data Serial number and Email for the client for can sed email for +1 year warranty
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const activateProduct = (data, success, failed) => async dispatch => {
    try {
        const response = await axios.post(`${APP_LINK}warranty/activate`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ACTIVATE_PRODUCT, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});
        dispatch({ type: CLEAR_PRODUCT });

        failed();
    }
};

/**
 * Get the product after extract the QR code
 * @param {String} code QR code for activation
 * @param {Function} finish Action which will execute when the request is finish
 */
export const qrGetProduct = (code, finish) => async dispatch => {
    try {
        const response = await axios.get(`${APP_LINK}warranty/QR/get/${code}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: CHECK_PRODUCT_EXIST, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

/**
 * Activate the product for 3 year after was activate for 2 years from QR code
 * @param {String} code Text which will help to activate product for 3 years
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const qrThreeYearActivation = (code, success, failed) => async dispatch => {
    try {
        const response = await axios.post(`${APP_LINK}warranty/QR/activate/three-years/${code}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ACTIVATE_PRODUCT, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Send email to the client for can activate the product for 3 years
 * @param {String} code QR code for activation
 * @param {Object} data Email address of the user
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const qrPrivateActivation = (code, data, success, failed) => async dispatch => {
    try {
        const response = await axios.post(`${APP_LINK}warranty/QR/activate/client/${code}`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ACTIVATE_PRODUCT, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Activate the product for 2 years with the shop account
 * @param {String} code QR code for activation
 * @param {Object} data Username and password of the shop
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const qrShopActivation = (code, data, success, failed) => async dispatch => {
    try {
        const response = await axios.post(`${APP_LINK}warranty/QR/activate/shop/${code}`, data);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ACTIVATE_PRODUCT, payload: response.data.product });
        dispatch({ type: LOG_IN, payload: response.data.user });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Activate the product with QR code. That function is run if the shop is already logged on the sytem
 * @param {String} code QR code for activation
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const qrActivation = (code, success, failed) => async dispatch => {
    try {
        const response = await axios.post(`${APP_LINK}warranty/QR/activate/${code}`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ACTIVATE_PRODUCT, payload: response.data.product });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Deactivate the product which is return it back without any reason
 * @param {Number} serial_number The serial number of the product
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const deactivateWarranty = (serial_number, success, failed) => async dispatch => {
    try {
        await axios.post(`${APP_LINK}warranty/deactivate`, { serial_number });

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: DEACTIVATE_PRODUCT, product: serial_number });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

/**
 * Clear the product which was show before to the client. For cannot go back to that product
 * @returns {{type: string}} String for reducer
 */
export const clearWarrantyProduct = () => ({ type: CLEAR_PRODUCT });

/**
 * Extend the warranty for one more year
 * @param {String} code Text which will help to activate product for 3 years
 * @param {Function} success Action which will execute if request is success
 * @param {Function} failed Action which will execute if request is failed
 */
export const extend = ({ code }, success, failed) => async (dispatch) => {
    try {
        const response = await axios.post(`${APP_LINK}warranty/extend`, { code });

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: ACTIVATE_PRODUCT, payload: response.data });

        success();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        failed();
    }
};

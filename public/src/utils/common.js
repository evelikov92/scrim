import axios from 'axios';

/**
 *
 * @type {string}
 */
export const APP_LINK = `/api/`;

/**
 *
 */
export const setBeginningSettings = () => {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
};

/**
 *
 * @param {String} email
 * @returns {Boolean}
 */
export const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

/**
 *
 * @param {Object} object
 * @param {String} column
 * @returns {string}
 */
export const generateQueryString = (object, column = '') => {
    let str = '';
    let index = 0;
    for (let obj in object) {
        if (!object.hasOwnProperty(obj) || !object[obj]) {
            continue;
        }

        if (index === 0) {
            str = `${column}${obj}=${object[obj]}`;
        } else {
            str += `&${column}${obj}=${object[obj]}`;
        }

        index++;
    }

    return str;
};

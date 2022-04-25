import axios from 'axios';
import { APP_LINK } from '../../../../public/src/utils/common';

import {
    GET_ALL_RMA_NOTIFICATIONS,
    ADD_ERROR,
    REMOVE_ERROR
} from '../../../../public/src/actions/types';

/**
 * Get all notifications for Rma which wait to change the status
 * @param {Function} finish Action which will execute when the request is finish
 */
export const getAllRmaNotifications = (finish) => async (dispatch) => {
    try {
        const response = await axios.get(`${APP_LINK}notifications/rma`);

        dispatch({ type: REMOVE_ERROR });
        dispatch({ type: GET_ALL_RMA_NOTIFICATIONS, payload: response.data });

        finish();
    } catch ({ response: { status, statusText, data } }) {
        dispatch({ type: ADD_ERROR, error: { status, statusText, data }});

        finish();
    }
};

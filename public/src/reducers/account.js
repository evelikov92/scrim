import {
    GET_LOGGED_USER,
    LOG_IN
} from "../actions/types";

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
        case GET_LOGGED_USER:
            return action.payload;
        default:
            return state;
    }
}

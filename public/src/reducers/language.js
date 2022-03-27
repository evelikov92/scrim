import { GET_LANGUAGE, SET_LANGUAGE } from "../actions/types";

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LANGUAGE:
            return action.lang;
        case SET_LANGUAGE:
            return action.lang;
        default:
            return state;
    }
}

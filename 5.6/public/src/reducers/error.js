import { ADD_ERROR, REMOVE_ERROR } from "../actions/types";

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_ERROR:
            return action.error;
        case REMOVE_ERROR:
            return initialState;
        default:
            return state;
    }
}

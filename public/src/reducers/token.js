import { SET_TOKEN } from "../../../public/src/actions/types";

export default function (state = { }, action) {
    switch (action.type) {
        case SET_TOKEN:
            return action.payload;
        default:
            return state;
    }
}
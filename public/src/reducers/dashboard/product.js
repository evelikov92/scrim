import { GET_ACTIVE_PRODUCT } from "../../../../public/src/actions/types";

export default function (state = { }, action) {
    switch (action.type) {
        case GET_ACTIVE_PRODUCT:
            return action.payload;
        default:
            return state;
    }
}

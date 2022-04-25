import { ACTIVATE_PRODUCT, CHECK_PRODUCT_EXIST, CLEAR_PRODUCT } from "../../../public/src/actions/types";

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTIVATE_PRODUCT:
        case CHECK_PRODUCT_EXIST:
            return action.payload;
        case CLEAR_PRODUCT:
            return initialState;
        default:
            return state;
    }
}

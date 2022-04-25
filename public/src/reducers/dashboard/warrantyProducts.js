import { GET_ALL_WARRANTY_PRODUCTS } from "../../../../public/src/actions/types";

const initialState = {
    items: [],
    count: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WARRANTY_PRODUCTS:
            return action.payload;
        default:
            return state;
    }
}

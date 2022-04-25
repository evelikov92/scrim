import { GET_ALL_PRODUCTS, GET_PRODUCT, GET_SLIDER_PRODUCTS, GET_CATEGORIES } from "../../../public/src/actions/types";

const initialState = {
    products: {},
    slider: [],
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GET_SLIDER_PRODUCTS:
            return {
                ...state,
                slider: action.payload
            };
        case GET_PRODUCT:
            return state;
        case GET_ALL_PRODUCTS:
            return state;
        default:
            return state;
    }
}

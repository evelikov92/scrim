import { GET_RMA, GET_LIST_OF_RMA, UPDATE_RMA_STATUS } from "../../../../public/src/actions/types";

const initialState = {
    list: {
        items: [],
        count: 0
    },
    active: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RMA:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            };
        case GET_LIST_OF_RMA:
            return {
                ...state,
                list: action.payload
            };
        case UPDATE_RMA_STATUS: {
            return {
                ...state,
                active: null
            }
        }
        default:
            return state;
    }
}

import { GET_RMA_STATUS, CLEAR_RMA_STATUS } from "../../../public/src/actions/types";

const initialState = [ ];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RMA_STATUS:
            return action.payload;
        case CLEAR_RMA_STATUS:
            return initialState;
        default:
            return state;
    }
}

import { GET_RMA_PDF_FILE } from "../../../public/src/actions/types";

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RMA_PDF_FILE:
            return action.payload;
        default:
            return state;
    }
}
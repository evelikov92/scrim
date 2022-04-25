import { GET_ALL_COUNTRIES } from "../../../public/src/actions/types";

export default function (state = [], action) {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return action.payload;
        default:
            return state;
    }
}
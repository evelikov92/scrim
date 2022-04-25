import { GET_CLIENT_INFORMATION } from "../../../public/src/actions/types";

export default function (state = { }, action) {
    switch (action.type) {
        case GET_CLIENT_INFORMATION:
            return action.payload;
        default:
            return state;
    }
}

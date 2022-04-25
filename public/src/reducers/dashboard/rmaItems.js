import { GET_RMA_ITEMS } from "../../../../public/src/actions/types";
import _ from 'lodash';

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_RMA_ITEMS:
            return _.chain(action.payload).keyBy('id').value();
        default:
            return state;
    }
}

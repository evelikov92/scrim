import { GET_ALL_STATISTICS } from '../../../public/src/actions/types';

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_STATISTICS:
            return action.payload;
        default:
            return state;
    }
}

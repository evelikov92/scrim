import { GET_ALL_RMA_NOTIFICATIONS } from '../../../../public/src/actions/types';

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RMA_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
}

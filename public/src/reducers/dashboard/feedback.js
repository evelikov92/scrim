import { GET_ALL_USER_FEEDBACK } from '../../../../public/src/actions/types';

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USER_FEEDBACK:
            return action.payload;
        default:
            return state;
    }
}

import { GET_ALL_EMAILS } from '../../../../public/src/actions/types';

export default function (state = '', action) {
    switch (action.type) {
        case GET_ALL_EMAILS:
            return action.payload;
        default:
            return state;
    }
}

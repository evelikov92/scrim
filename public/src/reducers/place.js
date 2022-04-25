import { GET_WHOLESALER_POSITION, CLEAR_WHOLESALER_POSITION } from '../../../public/src/actions/types';

export default (state = { }, action) => {
    switch (action.type) {
        case GET_WHOLESALER_POSITION:
            return action.payload;
        case CLEAR_WHOLESALER_POSITION:
            return { };
        default:
            return { };
    }
};

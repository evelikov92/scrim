import { GET_ALL_GENERAL_SETTINGS, CHANGE_GENERAL_SETTING } from '../../../public/src/actions/types';

const initialState = { };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GENERAL_SETTINGS:
            return action.payload;
        case CHANGE_GENERAL_SETTING:
            return {
                ...state,
                [action.key]: action.payload
            };
        default:
            return state;
    }
}

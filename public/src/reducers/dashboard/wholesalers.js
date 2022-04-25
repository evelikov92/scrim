import {
    TOGGLE_WHOLESALE_STATUS,
    LIST_ALL_WHOLESALES,
    GET_ACTIVE_WHOLESALER,
    EDIT_WHOLESALER_PROFILE
} from '../../../../public/src/actions/types';

const initialState = {
    items: [],
    count: 0,
    item: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_WHOLESALE_STATUS:
            return {
                ...state,
                items: state.items.map((item, i) => {
                    if (i === action.index) {
                        return { ...item, is_disabled: !action.status };
                    }

                    return item;
                })
            };
        case LIST_ALL_WHOLESALES:
            return action.payload;
        case GET_ACTIVE_WHOLESALER:
            return {
                ...state,
                item: action.payload
            };
        case EDIT_WHOLESALER_PROFILE:
            return {
                ...state,
                item: action.payload,
                items: state.items.map(item => {
                    if (item.id === action.id) {
                        return action.payload;
                    }
                    return item;
                })
            };
        default:
            return state;
    }
}

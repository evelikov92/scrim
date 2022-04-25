import { SET_ITEMS_PER_PAGE } from '../../../../public/src/actions/types';

export default function (state = { }, action) {
    switch (action.type) {
        case SET_ITEMS_PER_PAGE:
            return action.items;
        default:
            return state;
    }
}

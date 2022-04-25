import { SET_ITEMS_PER_PAGE } from '../../../../public/src/actions/types';

export default function (items) {
    return { type: SET_ITEMS_PER_PAGE, items };
};

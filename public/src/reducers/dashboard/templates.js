import {
    ADD_TEMPLATE_MESSAGE,
    EDIT_TEMPLATE_MESSAGE,
    GET_ALL_TEMPLATE_MESSAGES,
    GET_TEMPLATE_MESSAGE,
    OPEN_TEMPLATE_MESSAGE
} from "../../../../public/src/actions/types";

const initialState = {
    list: [],
    active: { },
    activeIndex: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TEMPLATE_MESSAGE:
            return {
                ...state,
                list: [ ...state.list, action.payload ]
            };
        case EDIT_TEMPLATE_MESSAGE:
            if (state.activeIndex) {
                return {
                    ...state,
                    list: state.list.map((template, i) => {
                        if (i === state.activeIndex) {
                            return {
                                ...template,
                                ...action.payload
                            }
                        }
                        return template
                    }),
                    active: action.payload
                }
            } else {
                return {
                    ...state,
                    active: action.payload
                }
            }
        case GET_ALL_TEMPLATE_MESSAGES:
            return {
                ...state,
                list: action.payload
            };
        case GET_TEMPLATE_MESSAGE:
            return {
                ...state,
                active: action.payload
            };
        case OPEN_TEMPLATE_MESSAGE:
            return {
                ...state,
                active: state.list[action.index],
                activeIndex: action.index
            };
        default:
            return state;
    }
}

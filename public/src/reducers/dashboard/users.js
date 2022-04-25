import { GET_ALL_USERS, GET_USER, UPDATE_USER, DELETE_USER, OPEN_USER, REGISTRATION, REMOVE_USERS } from "../../../../public/src/actions/types";

const initialState = {
    list: [],
    active: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REMOVE_USERS: 
            return initialState;
        case GET_USER:
            return {
                ...state,
                active: action.payload
            };
        case GET_ALL_USERS:
            return {
                ...state,
                list: action.payload
            };
        case UPDATE_USER:
            return {
                active: {
                    ...state.active,
                    ...action.payload
                },
                list: state.list.map(user => {
                    if (user.id === action.payload.id) {
                        return {
                            ...user,
                            ...action.payload
                        };
                    } else {
                        return user;
                    }
                })
            };
        case DELETE_USER:
            return {
                ...state,
                list: state.list.map((user, i) => {
                    if (i === action.index) {
                        return {
                            ...user,
                            is_deleted: !action.status
                        };
                    } else {
                        return user;
                    }
                })
            };
        case OPEN_USER:
            return {
                ...state,
                active: state.list[action.index]
            };
        case REGISTRATION:
            return {
                ...state,
                list: [ ...state.list, action.payload ]
            };
        default:
            return state;
    }
}

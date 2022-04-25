import { GET_LANGUAGE_RESOURCES, SET_TRANSLATOR_LANGUAGES_RESOURCES, GET_TRANSLATOR_LANGUAGES_RESOURCES } from "../../../public/src/actions/types";

const initialState = {
    en: { },
    de: { },
    fr: { },
    es: { },
    it: { },
    bg: { }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LANGUAGE_RESOURCES:
            return {
                ...state,
                [action.lang]: action.payload
            };
        case GET_TRANSLATOR_LANGUAGES_RESOURCES:
            return {
                ...state,
                ...action.payload
            };
        case SET_TRANSLATOR_LANGUAGES_RESOURCES:
            return {
                ...state,
                [action.lang]: action.payload
            };
        default:
            return state;
    }
}

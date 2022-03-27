import store from '../store';

export const languages = { en: 1,  de: 1,  fr: 1,  es: 1,  it: 1,  bg: 1 };

/**
 *
 * @param lang
 * @returns {*}
 * @private
 */
export const checkLanguageSupport = (lang) => {
    if (!lang || !languages.hasOwnProperty(lang)) { // check the language type
        lang = 'en';
        window.localStorage.setItem('lang', lang);
    }

    return lang;
};

/**
 *
 * @param key
 */
export const getLanguageResources = (key) => {
    const { strings, language } = store.getState();
    let lang = checkLanguageSupport(language);

    if (key) {
        if (!strings[lang].hasOwnProperty(key)) {
            // throw new Error('The language key is not included');
        }
        return strings[lang][key];
    }

    return strings[lang];
};

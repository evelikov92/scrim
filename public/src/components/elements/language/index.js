import React from 'react';
import PropTypes from 'prop-types';

import en from './en.png';
import de from './de.png';
import it from './it.png';
import fr from './fr.png';
import es from './es.png';

import './language.css';

/**
 * Show the drop down menu with any languages flag. For can user set language
 */
class Languages extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Do the drop down menu is open and show every language or is close and show only current language
             */
            isOpen: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    /**
     * Open/Close the languages drop down menu
     */
    toggleMenu () {
        this.setState({ isOpen: !this.state.isOpen });
    }

    /**
     * Set the new language for that user
     * @param {Boolean} isActive Do the selected language is not the same as current language
     * @param {String} lang The new selected language
     */
    setActiveLanguage (isActive, lang) {
        if (!isActive) {
            this.props.set(lang);
        }
    }

    render () {
        const languages = [
            { img: en, type: 'en' },
            { img: de, type: 'de' },
            { img: it, type: 'it' },
            { img: fr, type: 'fr' },
            { img: es, type: 'es' }
        ];

        const listClass = this.state.isOpen ? 'list-of-languages list-of-languages-open' : 'list-of-languages';

        const lang = [];
        for (let i = 0, len = languages.length; i < len; i++) {
            if (languages[i].type === this.props.active) {
                // Add active language first on the array
                lang.unshift(
                    <li key={i} className='language-item active-language-item' onClick={() => this.setActiveLanguage(true, languages[i].type)}>
                        <img src={languages[i].img} className='img-responsive img-thumbnail img-fluid' />
                    </li>
                );
            } else {
                lang.push(
                    <li key={i} className='language-item' onClick={() => this.setActiveLanguage(false, languages[i].type)}>
                        <img src={languages[i].img} className='img-responsive img-thumbnail img-fluid' />
                    </li>
                );
            }
        }

        return (
            <div className='language-elements'>
                <ul className={listClass} onClick={this.toggleMenu}>
                    {lang}
                </ul>
            </div>
        );
    }
}

Languages.propTypes = {
    /**
     * Current user language
     */
    active: PropTypes.string.isRequired,
    /**
     * Set the user language
     * @param {String} lang The user language key
     */
    set: PropTypes.func.isRequired,
};

export default Languages;

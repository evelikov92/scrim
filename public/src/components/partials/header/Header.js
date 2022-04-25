import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { getLanguageResources } from '../../../../../public/src/utils/language';
import { SUB_DOMAIN } from '../../../../../public/src/utils/common';

import Navigation from './Navigation';
import Languages from '../../elements/language';

import rmaLogo from './logo_title.png';

import './header.css';

/**
 * Component which show the header on the page
 */
class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Do header is open (responsive design on mobile devices)
             */
            isOpen: false,
            /**
             * Do dropdown menu is open
             */
            dropdownOpen: false,
            /**
             * Which page is not on the screen
             */
            activePage: '',
            /**
             * Title of the page
             */
            activeHeader: '',
            /**
             * Menu items
             */
            items: []
        };

        this.toggle = this.toggle.bind(this);
        this.closeNavigation = this.closeNavigation.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
        this.setHeader = this.setHeader.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.isAuthenticated !== this.state.isAuthenticated) {
            this.setState({ isAuthenticated: nextProps.isAuthenticated });
            this.setHeader(nextProps.account);
        }
    }

    componentDidMount () {
        this.setState({ isAuthenticated: this.props.isAuthenticated });
        this.setHeader(this.props.account);
    }

    /**
     * Set menu items on the header also the page header title
     * @param {Object} account User account data
     */
    setHeader (account) {
        const { navigation, headers } = getLanguageResources();

        const items = [
            { link: '/activate', title: navigation.warrantyActivation, header: headers.activation },
            { link: '/check', title: navigation.warrantyCheck, header: headers.check },
            { link: '/terms', title: navigation.warrantyTerms, header: headers.rma },
            { link: '/rma/create', title: navigation.rmaRegistration, header: headers.rma },
            { link: '/rma/check', title: navigation.rmaCheck, header: headers.rma },
            { link: '/wholesaler/registration', title: navigation.signUp },
            { link: '/account/login', title: navigation.logIn }
        ];

        const employeeItems = [
            { link: '/dashboard/rma', title: navigation.dashboard, header: `Hello ${account.name}` },
            { link: '/activate', title: navigation.warrantyActivation, header: `Hello ${account.name}` },
            { link: '/deactivate', title: navigation.warrantyDeactivation, header: `Hello ${account.name}` },
            { link: '/check', title: navigation.warrantyCheck, header: `Hello ${account.name}` },
            { link: '/terms', title: navigation.warrantyTerms, header: `Hello ${account.name}` },
            { link: '/rma/create', title: navigation.rmaRegistration, header: `Hello ${account.name}` },
            { link: '/rma/check', title: navigation.rmaCheck, header: `Hello ${account.name}` },
            { link: '/account/logout', title: navigation.logOut }
        ];

        const shopperItems = [
            { link: '/statistic', title: navigation.statistic, header: `Hello ${account.name}` },
            { link: '/account/profile', title: navigation.profile, header: `Hello ${account.name}` },
            { link: '/activate', title: navigation.warrantyActivation, header: `Hello ${account.name}` },
            { link: '/deactivate', title: navigation.warrantyDeactivation, header: `Hello ${account.name}` },
            { link: '/check', title: navigation.warrantyCheck, header: `Hello ${account.name}` },
            { link: '/terms', title: navigation.warrantyTerms, header: `Hello ${account.name}` },
            { link: '/rma/create', title: navigation.rmaRegistration, header: `Hello ${account.name}` },
            { link: '/rma/check', title: navigation.rmaCheck, header: `Hello ${account.name}` },
            { link: '/account/logout', title: navigation.logOut }
        ];

        const translatorItems = [
            { link: '/translate', title: navigation.translate, header: `Hello ${account.name}` },
            { link: '/account/logout', title: navigation.logOut }
        ];

        // Set correct menu items for user
        if (account.group === '3') {
            this.setState({ items: shopperItems }, () => this.setActivePage());
        } else if (account.group === '2' || account.group === '1') {
            this.setState({ items: employeeItems }, () => this.setActivePage());
        } else if (account.group === '4') {
            this.setState({ items: translatorItems }, () => this.setActivePage());
        } else {
            this.setState({ items }, () => this.setActivePage());
        }
    }

    /**
     * Set the information about the active page (Change color, set Header title)
     */
    setActivePage () {
        const url = window.location.pathname;
        let isFound = false;
        for (let i = 0, len = this.state.items.length; i < len; i++) {
            let item = this.state.items[i];
            if (url.startsWith(`${SUB_DOMAIN}${item.link}`)) {
                this.setState({ activePage: item.title, activeHeader: item.header || '' });
                isFound = true;
                break;
            }
        }

        if (!isFound) {
            this.setState({ activePage: this.state.items[0].title, activeHeader: this.state.items[0].header || '' });
        }
    }

    /**
     * Open/Close the drop down menu
     */
    toggle () {
        this.setState({ isOpen: !this.state.isOpen });
    }

    /**
     * Close the drop down menu
     * @param {Object} item Menu item data
     */
    closeNavigation (item) {
        if (this.state.isOpen) {
            this.toggle();
        }

        this.setState({ activePage: item.title, activeHeader: item.header || '' });

        if (!this.props.account) {
            this.setHeader(this.props.account);
        }
    }

    /**
     * Set new language for the user
     * @param {String} lang The new language of the user
     */
    setLanguage (lang) {
        this.props.setLanguage(lang, () => this.setHeader(this.props.account));
    }

    render () {
        console.log('HEADER', this.props);

        return (
            <header className='header'>
                <Row className='master-header'>
                    <Col className={'text-center'}>
                        <a href={'http://www.g-systems.eu'}>
                            <img className='img-fluid' src={rmaLogo} alt={'header-image'} />
                        </a>
                    </Col>
                </Row>

                <Row className='sub-header'>
                    <Col>
                        <Navbar color='default' light expand='md'>
                            <NavbarToggler right='true' onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Navigation
                                activePage={this.state.activePage}
                                items={this.state.items}
                                closeNavigation={this.closeNavigation} />
                            </Collapse>
                        </Navbar>
                        {this.state.activeHeader &&
                        <div className='header-title'>
                            {this.state.activeHeader}
                        </div>}
                        <Languages active={window.localStorage.getItem('lang')} set={(lang) => this.setLanguage(lang)} />
                    </Col>
                </Row>
            </header>
        );
    }
}

Header.propTypes = {
    /**
     * User account (if is logged)
     */
    account: PropTypes.object,
    /**
     * Function which change the user language
     */
    setLanguage: PropTypes.func.isRequired,
    /**
     * Do user is authenticated
     */
    isAuthenticated: PropTypes.bool.isRequired
};

export default Header;

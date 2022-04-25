import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getLanguageResources } from "../../../../public/src/utils/language";

import Navigation from './header/Navigation';

import './header/navigation.css';

class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false,
            activePage: ''
        };

        this.toggle = this.toggle.bind(this);
        this.notificationToggle = this.notificationToggle.bind(this);
        this.closeNavigation = this.closeNavigation.bind(this);
    }

    notificationToggle () {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    toggle () {
        this.setState({ isOpen: !this.state.isOpen });
    }

    closeNavigation (title) {
        if (this.state.isOpen) {
            this.toggle();
        }

        this.setState({ activePage: title });
    }

    render () {
        const strings = getLanguageResources('navigation');

        const companyItem = [
            { link: '/about', title: strings.about, icon: 'info-circle' },
            { link: '/contact', title: strings.contact, icon: 'info-circle' },
            { link: '/activate', title: strings.warranty, icon: 'book' },
            { link: '/rma/create', title: strings.rma, icon: 'id-card' }
        ];

        if (this.props.isAuthenticated) {
            if (this.props.account.group === '1' || this.props.account.group === '2') {
                companyItem.push({ link: '/dashboard/rma', title: strings.dashboard, icon: 'tachometer' });
            }

            companyItem.push({ link: '/account/logout', title: strings.logOut, icon: 'sign-out' });
        } else {
            companyItem.push({ link: '/wholesaler/registration', title: strings.signUp, icon: 'user-plus' });
            companyItem.push({ link: '/account/login', title: strings.logIn, icon: 'sign-in' });
        }

        return (
            <header className='header'>
                <Navbar color='default' light expand='md'>
                    <NavbarToggler right='true' onClick={this.toggle} />
                    <NavbarBrand tag={Link} to='/' className='align-middle'>
                        G-Systems OldEngineering ood
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Navigation
                            activePage={this.state.activePage}
                            className='ml-auto'
                            items={companyItem}
                            closeNavigation={this.closeNavigation} />
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default Header;

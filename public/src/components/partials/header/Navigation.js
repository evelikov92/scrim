import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';

import './navigation.css';

/**
 * Component which is draw the Main menu
 * @param {Object} props menu items, active page and close menu function
 */
const Navigation = (props) => {
    return (
        <Nav className={props.className} navbar>
            {props.items.map((item, i) => {
                return (
                    <NavItem key={i} className='text-center'>
                        <NavLink tag={Link} to={item.link}
                                 onClick={() => props.closeNavigation(item)}
                                 className={`gse-link text-uppercase ${props.activePage === item.title && 'active'}`} >
                            {item.title}
                        </NavLink>
                    </NavItem>
                );
            })}
        </Nav>
    );
};

Navigation.propTypes = {
    /**
     * Menu items
     */
    items: PropTypes.array.isRequired,
    /**
     * Function which will close the head menu
     */
    closeNavigation: PropTypes.func.isRequired,
    /**
     * Which page is active
     */
    activePage: PropTypes.string.isRequired
};

export default Navigation;

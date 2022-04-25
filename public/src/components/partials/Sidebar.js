import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './sidebar.css';

/**
 * Component to show sidebar
 */
const Sidebar = (props) => {
    return (
        <ul className={`sidebar-nav ${props.className}`}>
            {props.items.map((item, i) => {
                const className = props.url.startsWith(item.link) ? 'col text-left active-sidebar-item' : 'col text-left';
                return (
                    <li key={i} className={className}>
                        <Link to={item.link}>
                            <i className={`fa fa-${item.icon} fa-lg`} aria-hidden='true' /> &nbsp; {item.title}
                        </Link>
                    </li>
                );
            })}
        </ul>

    )
};

Sidebar.propTypes = {
    /**
     * List of menu items
     */
    items: PropTypes.array.isRequired,
    /**
     * Classes for sidebar
     */
    className: PropTypes.string
};

export default Sidebar;

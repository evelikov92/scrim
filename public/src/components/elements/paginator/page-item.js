import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PaginationItem, PaginationLink } from 'reactstrap';

import './react-simple-paginator.css';

/**
 * Show the Page item box where inside is show the (number) on the page
 * @param {String} classes The classes of the PageItem
 * @param {String} link Link to that PageItem
 * @param {String} title The text of the PageItem
 */
const PageItem = ({ classes, link, title }) => {
    return (
        <PaginationItem className={classes}>
            <PaginationLink tag={Link} to={link}>{title}</PaginationLink>
        </PaginationItem>
    );
};

PageItem.propTypes = {
    /**
     * The classes of the Pager do is active for example
     */
    classes: PropTypes.string,
    /**
     * The Link to that PageItem
     */
    link: PropTypes.string.isRequired,
    /**
     * The text of the Pager
     */
    title: PropTypes.string.isRequired
};

export default PageItem;

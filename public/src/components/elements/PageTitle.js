import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import GSEButton from './GSEButton';

/**
 * Page Title Header
 * @param {String} className
 * @param {String} title
 */
const PageTitle = ({ className, title }) => {
    return (
        <Row className={className}>
            <Col className='warranty-header' lg={8}>
                <GSEButton title={title} type='reverse' />
            </Col>
        </Row>
    );
};

PageTitle.propTypes = {
    /**
     * Class name of the page title header
     */
    className: PropTypes.string,
    /**
     * Show text on page title header
     */
    title: PropTypes.string.isRequired
};

export default PageTitle;

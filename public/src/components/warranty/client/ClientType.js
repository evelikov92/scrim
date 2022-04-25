import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import GSEButton from '../../elements/GSEButton';

import './client-type.css';

/**
 * Show the button with image on the client type (Private, shop)
 */
const ClientType = ({ className, type, title }) => {
    const image = require(`./${type}.png`);

    return (
        <Col className={`client-type ${className}`}>
            <Link to={`/activate/${type}`}>
                <GSEButton title={title} type='normal' />
                <img alt='Client Type' className='img-fluid img-responsive' src={image} />
            </Link>
        </Col>
    )
};

ClientType.propTypes = {
    /**
     * Class names on the component
     */
    className: PropTypes.string,
    /**
     * Specific link type and image type
     */
    type: PropTypes.oneOf([ 'private', 'shop' ]),
    /**
     * Text for show
     */
    title: PropTypes.string.isRequired
};

export default ClientType;

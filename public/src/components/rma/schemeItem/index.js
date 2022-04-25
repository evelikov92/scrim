import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import './schemeItem.css';

/**
 * Diagram item left and right part
 */
const SchemeItem = (props) => {
    return (
        <Col className='scheme-item' xs={12}>
            <Row>
                <Col lg={9} md={8}>
                    <Row>
                        <Col className='text-box left-text-box' md={10} >{props.left}</Col>
                        <Col md={2} className={'text-center no-col'}>
                            <i className='fa fa-times fa-2x' />
                            <i className='fa fa-arrow-circle-right fa-2x' />
                        </Col>
                    </Row>
                    <Row className={'yes-row'}>
                        <Col>
                            <i className='fa fa-check-circle fa-2x' />
                            <i className='fa fa-arrow-circle-down fa-2x' />
                        </Col>
                    </Row>
                </Col>
                <Col className='text-center text-box right-text-box' lg={3} md={4}>{props.right}</Col>
            </Row>
        </Col>
    );
};

SchemeItem.propTypes = {
    /**
     * The text on left part of the scheme
     */
    left: PropTypes.string.isRequired,
    /**
     * The text on right part of the scheme
     */
    right: PropTypes.string.isRequired
};

export default SchemeItem;

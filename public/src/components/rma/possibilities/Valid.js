import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, FormGroup, Label } from 'reactstrap';

/**
 * Show the information about product which is valid
 */
const Valid = (props) => {
    return (
        <Row>
            <Col>
                <Col lg={10}>
                    <FormGroup row>
                        <Label md={12}>
                            {props.title} &nbsp; &nbsp;
                            <span className='valid-time-span'>
                                {new Date(props.date * 1000).toLocaleDateString()}
                            </span>
                        </Label>
                    </FormGroup>
                </Col>
            </Col>
        </Row>
    )
};

Valid.propTypes = {
    /**
     * The text of the valid product
     */
    title: PropTypes.string.isRequired,
    /**
     * The expired warranty date
     */
    date: PropTypes.number.isRequired
};

export default Valid;

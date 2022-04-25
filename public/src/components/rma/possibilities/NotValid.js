import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Label, FormGroup } from 'reactstrap';

/**
 * Show the text for not valid the Product so we give him the warranty till date of sale + 2 years
 */
const NotValid = (props) => {
    return <Fragment>
        <Row>
            <Col>
                <Label md={10}>{props.first}</Label>
            </Col>
        </Row>
        <Row>
            <Col>
                <Col lg={10}>
                    <FormGroup row>
                        <Label md={12}>
                            {props.second} &nbsp; &nbsp;
                            <span className='valid-time-span'>{new Date((props.date + 63072000) * 1000).toLocaleDateString()}</span>
                        </Label>
                    </FormGroup>
                </Col>
            </Col>
        </Row>
    </Fragment>
};

NotValid.propTypes = {
    /**
     * First text to show the client
     */
    first: PropTypes.string.isRequired,
    /**
     * Second text to show the client
     */
    second: PropTypes.string.isRequired,
    /**
     * The date of valid time on unix time stamp
     */
    date: PropTypes.number.isRequired
};

export default NotValid;

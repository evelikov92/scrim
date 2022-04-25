import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * Captcha input field
 * @param {Object} props Object for Field from redux-form
 */
const Captcha = (props) => (
    <Fragment>
        <Row>
            <Col>
                {props.meta.touched && props.meta.error}
                <span style={{ display: 'inline-block' }} className={'float-right'}>
                    <ReCAPTCHA
                        sitekey={'6Le22WwUAAAAAPk-Sw2zVNCNsxvU0mjjeShu_L4q'}
                        onChange={response => props.input.onChange(response)} />
                </span>
            </Col>
        </Row>

        <br />
    </Fragment>
);

export default Captcha;

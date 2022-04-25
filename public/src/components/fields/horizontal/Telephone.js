import React from 'react';
import { Label, FormGroup, Col } from 'reactstrap';

import ReactTelInput from 'react-telephone-input/lib/withStyles';

import flags from '../flags.png';
import '../tel.css';

/**
 * Input field for Telephone. Is used third party library
 * @param {Object} props Object for Field from redux-form
 */
const TelephoneField = (props) => {
    return (
        <FormGroup row>
            <Label md={5}>{props.label}</Label>
            <Col md={7}>
                <ReactTelInput
                    name='telephone'
                    className='telephone-input'
                    defaultCountry="af"
                    value={props.input.value}
                    onBlur={props.handlePhoneChange}
                    flagsImagePath={flags} />
            </Col>
        </FormGroup>
    );
};

export default TelephoneField;

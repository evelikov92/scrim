import React from 'react';
import { Label, FormGroup } from 'reactstrap';

import ReactTelInput from 'react-telephone-input/lib/withStyles';

import flags from './flags.png';
import './tel.css';

/**
 * Input field for Telephone. Is used third party library
 * @param {Object} props Object for Field from redux-form
 */
const TelephoneField = (props) => {
   return (
        <FormGroup>
            <Label>{props.label}</Label>
            <ReactTelInput
                name='telephone'
                className='telephone-input'
                defaultCountry="af"
                onBlur={props.handlePhoneChange}
                flagsImagePath={flags} />
        </FormGroup>
    );
};

export default TelephoneField;

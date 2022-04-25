import React from 'react'
import PropTypes from 'prop-types';
import { Label, Input, FormGroup } from 'reactstrap';

import './checkbox.css';

/**
 * Captcha input field
 * @param {Object} props Object for Field from redux-form
 */
const Checkbox = (props) => {
    return (
        <FormGroup>
            <Label className='ux-checkbox' htmlFor={props.id}>
                <Input type='checkbox' className='material-checkbox' checked={props.isChecked} id={props.id} {...props.input} /> &nbsp;
                <span className='material-checkbox-title'>{props.label}</span>
            </Label>
        </FormGroup>
    );
};

export default Checkbox;

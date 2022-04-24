import React from 'react';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';

import './fields.css';

/**
 * Input Text Field Element
 * @param {Object} props Object for Field from redux-form
 */
const TextField = (props) => {
    const { meta: { touched, error }, errorMessage } = props;

    let color = '';
    if ((error || errorMessage) && touched) { // Is invalid because has some error
        color = 'is-invalid';
    } else if (!error && touched) { // Is valid because is not have error and is on typing
        color = 'is-valid';
    } else if (errorMessage) { // Is invalid because is have error from the server
        color = 'is-invalid';
    } else if (!errorMessage && !error) { // Is valid because is not have any errors
        color = 'is-valid';
    }

    let value = props.input.value;

    return (
        <FormGroup>
            <Label htmlFor={props.id}>{props.label}</Label>
            <Input placeholder={props.placeholder}
                   type={props.type}
                   {...props.input}
                   onBlur={props.blur}
                   className={color}
                   value={value}
                   id={props.id}>
                {props.children}
            </Input>
            {((touched && error && <FormFeedback>{error}</FormFeedback>) || errorMessage && <FormFeedback style={{ display: 'block' }}>{errorMessage}</FormFeedback>)}
        </FormGroup>
    );
};

export default TextField;

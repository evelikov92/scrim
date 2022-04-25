import React from 'react';
import { Label, Input, FormGroup, FormFeedback, Col } from 'reactstrap';

import '../../../../../public/src/components/fields/fields.css';

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
        <FormGroup row>
            <Label htmlFor={props.id} md={5}>{props.label}</Label>
            <Col md={7}>
                {props.blur ?
                    // With on change
                    <Input
                        type={props.type}
                        {...props.input}
                        value={value}
                        className={color}
                        id={props.id}
                        onBlur={props.blur} /> :
                    // Without on change
                    <Input
                        type={props.type}
                        {...props.input}
                        value={value}
                        className={color}
                        id={props.id} />
                }
                {/* Show the error message if need. It's unreadable but is work. Magic work */}
                {((touched && error && <FormFeedback>{error}</FormFeedback>) || errorMessage && <FormFeedback style={{ display: 'block' }}>{errorMessage}</FormFeedback>)}
            </Col>
        </FormGroup>
    );
};

export default TextField;

import React from 'react';
import { Label, Input, FormGroup, Col } from 'reactstrap';

import '../../../../../public/src/components/fields/fields.css';

/**
 * Input Select field Element
 * @param {Object} props Object for Field from redux-form
 */
const SelectField = (props) => {
    return (
        <FormGroup row>
            <Label htmlFor={props.id} md={5}>{props.label}</Label>
            <Col md={7}>
                <Input type='select' {...props.input} name={props.name} id={props.id} value={props.value}>
                    {props.children}
                </Input>
            </Col>
        </FormGroup>
    );
};

export default SelectField;

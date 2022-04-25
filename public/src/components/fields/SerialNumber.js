import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Alert } from 'reactstrap';
import { Field } from 'redux-form';
import { getLanguageResources } from '../../../../public/src/utils/language';

import Text from './horizontal/Text';
import GSEBall from '../elements/GSEBall';

/**
 * Show the form about Serial number
 * @param {Number} col How many columns is used from width of the screen
 * @param {String} errorMessage Error message get from server
 * @param {Function} checkSerialNumber Callback for check serial number onBlur
 * @param {String} warningMessage Warning message show to client if is private person
 * @param {String} serialNumberStatus Status of the serial number field
 */
const SerialNumberField = ({ col, errorMessage, checkSerialNumber, warningMessage, serialNumberStatus }) => {
    const { serialNumber } = getLanguageResources('labels');

    return (
        <Row>
            <Col lg={col || 7}>
                <Col lg='10' className='float-left'>
                    <Field
                        required
                        type='text'
                        errorMessage={errorMessage}
                        label={serialNumber}
                        onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault(); }}
                        id='warranty-serial-number'
                        blur={checkSerialNumber}
                        name='serial_number'
                        component={Text} />
                    {warningMessage && <Alert color={'warning'}>{warningMessage}</Alert>}
                </Col>
                <Col lg='2' className='float-right visible-lg'>
                    <GSEBall color={serialNumberStatus} />
                </Col>
            </Col>
        </Row>
    );
};

SerialNumberField.propTypes = {
    col: PropTypes.number,
    errorMessage: PropTypes.string,
    checkSerialNumber: PropTypes.func,
    warningMessage: PropTypes.string,
    serialNumberStatus: PropTypes.oneOf([ 'success', 'danger' ])
};

export default SerialNumberField;

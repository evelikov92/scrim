import React from 'react';
import { Row, Col } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

/**
 * Component which show text to client after registration
 */
const RegistrationInfo = () => {
    return (
        <Col>
            <Row>
                <Col className='text-center'>{getLanguageResources('common').wholesalerRegisterNextStep}</Col>
            </Row>
        </Col>
    );
};

export default RegistrationInfo;

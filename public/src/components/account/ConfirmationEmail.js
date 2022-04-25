import React from 'react';
import { Row, Col } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

/**
 * Show the text to the user for that is send Confirmation Email
 */
const ConfirmationEmail = () => {
    const { first, second } = getLanguageResources('confirmEmail');

    return (
        <Col>
            <Row>
                <Col>
                    <h1>{first}</h1>
                    <p>{second}</p>
                </Col>
            </Row>
        </Col>
    );
};

export default ConfirmationEmail;

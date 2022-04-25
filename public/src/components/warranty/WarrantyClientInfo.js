import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Alert, Col } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

const WarrantyClientInfo = ({ shopName, clientName }) => {
    const { roles: { wholesaler }, labels: { client } } = getLanguageResources();

    return (
        <Fragment>
            <Row>
                <Col className={'warranty-body'} lg={{ size: 8, offset: 0}} md={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }}>
                    <Alert color={'info'}>{client}: {clientName}</Alert>
                </Col>
            </Row>

            {shopName && <Row>
                <Col className={'warranty-body'} lg={{ size: 8, offset: 0 }} md={{ size: 10, offset: 1 }} xs={{ size: 12, offset: 0 }}>
                    <Alert color={'info'}>{wholesaler}: {shopName}</Alert>
                </Col>
            </Row>}
        </Fragment>
    );
};

export default WarrantyClientInfo;

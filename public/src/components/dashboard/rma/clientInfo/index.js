import React from 'react';
import PropTypes from 'prop-types';
import { getLanguageResources } from "../../../../../../public/src/utils/language";
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import _ from "lodash";

const ClientInfo = ({ client }) => {
    return (
        <Card>
            <CardHeader className='text-center card-header-second'>{getLanguageResources('titles').clientInfo}</CardHeader>
            <CardBody>
                <Row>
                    {_.map(client, (val, key) => {
                        return (
                            <Col key={`client-${key}`} lg={6}>
                                <strong>{key}: </strong>{val}
                            </Col>
                        );
                    })}
                </Row>
            </CardBody>
        </Card>
    )
};

export default ClientInfo;
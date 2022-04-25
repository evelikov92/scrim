import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardImg, CardHeader } from 'reactstrap';

import { getLanguageResources } from "../../../../public/src/utils/language";

import './warranty.css';

import WarrantyActivation from './WarrantyActivation';
import PageTitle from '../elements/PageTitle';

class Private extends React.Component {
    componentDidMount () {
        if (this.props.product) {
            this.props.clearWarrantyProduct();
        }
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    render () {
        let { privatePerson, clientChoose: { clientPrivateBtn } } = getLanguageResources();

        return (
            <Col className='warranty-description private-warranty-description'>
                <PageTitle title={clientPrivateBtn} />

                <br />

                <Row>
                    <Col className='warranty-body'>{privatePerson.first}</Col>
                </Row>

                <Row>
                    <Col className='warranty-body'>{privatePerson.second}</Col>
                </Row>

                <br />

                <Row>
                    <Col className='warranty-body'>{privatePerson.third}</Col>
                </Row>

                <Row>
                    <Col className='warranty-body'>{privatePerson.fourth}</Col>
                </Row>

                <Row>
                    <Col className='warranty-body'>{privatePerson.fifth}</Col>
                </Row>

                <Row>
                    <Col className='warranty-body'>{privatePerson.sixth}</Col>
                </Row>

                <br />

                <Row>
                    <WarrantyActivation
                        err={this.props.error}
                        checkSerialNumber={this.props.checkSerialNumber}
                        activateProduct={this.props.activateProduct}
                        success={() => this.props.history.push('/is-active')}
                        type='private'
                        product={this.props.product} />
                </Row>

                <br />

                <Row>
                    <Col className='warranty-body'>{privatePerson.seventh}</Col>
                </Row>

                <Row>
                    <Col className='warranty-body'>{privatePerson.eight} <a style={{ textDecoration: 'underline' }} href="mailto:support@g-systems.eu">support@g-systems.eu</a></Col>
                </Row>

                <Row>
                    <Col className='warranty-body warranty-body-red'>{privatePerson.tenth}</Col>
                </Row>

                <br />
            </Col>
        );
    }
}

export default Private;

import React from 'react';
import { Row, Col } from 'reactstrap';
import ClientType from './client/ClientType';
import { getLanguageResources } from "../../../../public/src/utils/language";

class Warranty extends React.Component {
    componentDidMount () {
        if (this.props.account && this.props.account.group <= 3 && this.props.account.group > 0) {
            this.props.history.push('/activate/shop/1');
        }
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    render () {
        const { clientPrivateBtn, clientShopBtn } = getLanguageResources('clientChoose');
        let error = {
            serial_number: null
        };
        if (this.props.err && this.props.err.hasOwnProperty('data') && this.props.err.data.hasOwnProperty('errors')) {
            error = this.props.err.data.errors;
        }

        return (
            <Col className={'warranty-description warranty-choose'}>
                <Row>
                    <Col lg={{ size: 4, offset: 1 }} md={{ size: 5, offset: 1 }} sm={6}>
                        <ClientType className='float-left' type='private' title={clientPrivateBtn} />
                    </Col>
                    <Col lg={{ size: 4, offset: 2 }} md={5} sm={6}>
                        <ClientType className='float-right' type='shop' title={clientShopBtn} />
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Warranty;

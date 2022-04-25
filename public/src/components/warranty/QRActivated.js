import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { getLanguageResources } from "../../../../public/src/utils/language";

import Spinner from '../../../../public/src/components/elements/spinner';
import PageTitle from "../elements/PageTitle";

import PrivateForm from './qr/PrivateForm';
import ShopForm from './qr/ShopForm';
import GSEButton from "../elements/GSEButton";

class QRActivated extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isActivated: false,
            isFetchingData: false,
        };

        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
        this.warrantyActivationNow = this.warrantyActivationNow.bind(this);
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    componentDidMount () {
        if (this.props.account.email && Number(this.props.account.group) <= 3) {
            this.props.qrGetProduct(this.props.match.params.code, this.failed);
        } else {
            this.setState({ isFetchingData: true });
        }
    }

    warrantyActivationNow () {
        if (this.props.account.email && Number(this.props.account.group) <= 3) {
            this.props.qrActivation(this.props.match.params.code, this.success, this.failed);
        }
    }

    success () {
        this.props.history.push('/is-active');
    }

    failed () {
        this.setState({ isFetchingData: true, isActivated: false });
    }

    render () {
        const { headers: { activation }, buttons: { activateWarranty }, common: { qrWarrantyActivation }, labels: { product } }  = getLanguageResources();

        if (!this.state.isFetchingData) {
            return (
                <div id='qr-activation'>
                    <Spinner headTagId='qr-activation' />
                </div>
            );
        } else if (this.props.product.SerialNumber) {
            return (
                <Col id={'qr-activation'}>
                    <Row>
                        <Col className={'text-center'}>
                            {qrWarrantyActivation} <strong>{this.props.product.SerialNumber}</strong> {product} <strong>{this.props.product.Name}</strong>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col lg={{ size: 4, offset: 4 }} md={{ size: 6, offset: 3 }}>
                            <GSEButton
                                type={'normal'}
                                btnType={'normal'}
                                title={activateWarranty}
                                click={this.warrantyActivationNow} />
                        </Col>
                    </Row>
                </Col>
            );
        } else {
            return (
                <Col id={'qr-activation'}>
                    <PageTitle title={activation} />

                    <br />

                    <Row>
                        {!this.props.account.hasOwnProperty('email') && <Col lg={6} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <ShopForm
                                success={this.success}
                                submit={() => this.setState({ isFetchingData: false })}
                                code={this.props.match.params.code}
                                qrActivation={this.props.qrShopActivation} />
                        </Col>}

                        <Col lg={6} style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <PrivateForm
                                success={() => this.props.history.push('/account/confirmation')}
                                submit={() => this.setState({ isFetchingData: false })}
                                code={this.props.match.params.code}
                                qrActivation={this.props.qrPrivateActivation} />
                        </Col>
                    </Row>
                </Col>
            );
        }
    }
}

QRActivated.propTypes = {
    qrActivation: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired,
    sendEmail: PropTypes.func.isRequired
};

export default QRActivated;

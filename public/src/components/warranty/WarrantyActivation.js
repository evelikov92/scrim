import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { getLanguageResources } from "../../../../public/src/utils/language";
import { validateEmail } from "../../../../public/src/utils/common";

import { Form, Col, Row } from 'reactstrap';

import Spinner from '../../../../public/src/components/elements/spinner';
import GSEButton from '../elements/GSEButton';
import GSEBall from '../elements/GSEBall';

import Text from '../fields/horizontal/Text';
import SerialNumberField from "../fields/SerialNumber";
import Captcha from "../fields/Captcha";
import ProductInfo from '../rma/possibilities/ProductInfo';
import WarrantyClientInfo from "./WarrantyClientInfo";

class WarrantyActivation extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: true,
            serialNumberStatus: 'danger',
            serialNumberNotFound: null,
            emailNotCorrect: null,
            emailStatus: props.type === 'shop' ? 'success' : 'danger',
            formStatus: 'danger',
            warningMessage: null
        };

        this.checkEmailAddress = this.checkEmailAddress.bind(this);
        this.checkSerialNumber = this.checkSerialNumber.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.serialNumberSuccess = this.serialNumberSuccess.bind(this);
        this.serialNumberFailed = this.serialNumberFailed.bind(this);
        this.emailSuccess = this.emailSuccess.bind(this);
        this.emailFailed = this.emailFailed.bind(this);
        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
    }

    componentDidMount () {
        if (this.props.email) {
            this.props.initialize({ email: this.props.email, serial_number: '' });
        }
    }

    success () {
        this.setState({ isFetchingData: true });
        this.props.success();
    }

    failed () {
        this.setState({ isFetchingData: true });
    }

    formSubmit (values) {
        if (this.props.type !== 'shop') {
            if (!values.recaptcha) {
                return window.alert(getLanguageResources('errors').recaptchaRequired);
            }
        }

        if (this.state.serialNumberStatus === 'danger' || this.state.emailStatus === 'danger') {
            return;
        }
        this.setState({isFetchingData: false});
        this.props.activateProduct({...values, type: this.props.type}, this.success, this.failed);
    }

    checkSerialNumber (number) {
        if (!number || isNaN(number) ||(number.length !== 4 && number.length !== 5 && number.length !== 10)) {
            this.setState({ serialNumberNotFound: getLanguageResources('errors').serialNumberNotFound });
            return this.serialNumberFailed();
        } else if (number.length === 4) {
            number = `000000${number}`;
            this.props.initialize({ serial_number: number, });
        }

        this.setState({ isFetchingData: false });
        this.props.checkSerialNumber(number, this.serialNumberSuccess, this.serialNumberFailed);
    }

    serialNumberSuccess () {
        if (this.props.product && this.props.product.id) {
            if (this.props.type === 'private' && !this.props.product.Active) {
                const { gseWarranty, agreeWarranty, disagreeWarranty } = getLanguageResources('warning');
                this.setState({
                    warningMessage: `${gseWarranty} ${new Date((Number(this.props.product.updated_at) + 63072000) * 1000).toLocaleDateString()}! ${agreeWarranty} ${disagreeWarranty}`
                });
            } else {
                this.setState({ warningMessage: null });
            }



            if (
                (this.props.type === 'shop' && this.props.product.Active) ||
                (
                    (this.props.product.Active && Number(this.props.product.StopDate) - Number(this.props.product.StartDate) >= 63072100) ||
                    (this.props.product.Active && Number(this.props.product.StopDate) < Date.now() / 1000)
                )
            ) {
                this.setState({ isFetchingData: true, serialNumberNotFound: getLanguageResources('errors').productAlreadyRegister });
                this.serialNumberFailed();
            } else {
                this.setState({ isFetchingData: true, serialNumberStatus: 'success', serialNumberNotFound: null });

                if (this.state.emailStatus === 'success') {
                    this.setState({ isFetchingData: true, formStatus: 'success' });
                }
            }
        } else {
            this.setState({ isFetchingData: true, serialNumberNotFound: getLanguageResources('errors').serialNumberNotFound });
            this.serialNumberFailed();
        }
    }

    serialNumberFailed () {
        this.setState({ isFetchingData: true, serialNumberStatus: 'danger', formStatus: 'danger' });
    }

    checkEmailAddress (email) {
        if (email) {
            if (validateEmail(email)) {
                this.emailSuccess();
            } else {
                this.emailFailed();
            }
        }
    }

    emailSuccess () {
        if (this.state.serialNumberStatus === 'success') {
            this.setState({ emailStatus: 'success', formStatus: 'success', emailNotCorrect: null });
        } else {
            this.setState({ emailStatus: 'success' });
        }
    }

    emailFailed () {
        this.setState({ emailStatus: 'danger', formStatus: 'danger', emailNotCorrect: getLanguageResources('errors').emailNotCorrect })
    }

    render () {
        const { labels: { email, client, optional }, buttons: { finish } } = getLanguageResources();

        let error = {
            email: null,
            serial_number: null
        };
        if (this.props.err && this.props.err.hasOwnProperty('data') && this.props.err.data.hasOwnProperty('errors')) {
            error = this.props.err.data.errors;
        }

        const emailLabel = this.props.type === 'shop' ? `${client} ${email} ${optional}` : email;

        return (
            <Col className='warranty-activation-form'>
                <Row>
                    <Col>
                        <Form id='warranty-activation-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                            {!this.state.isFetchingData && <Spinner headTagId='warranty-activation-form' />}

                            <Row>
                                <Col lg={7}>
                                    <SerialNumberField
                                        col={12}
                                        warningMessage={this.state.warningMessage}
                                        errorMessage={error.serial_number || this.state.serialNumberNotFound}
                                        checkSerialNumber={e => this.checkSerialNumber(e.target.value)}
                                        serialNumberStatus={this.state.serialNumberStatus} />
                                </Col>
                                {this.props.type !== 'shop' && <Col lg={3}>
                                    <Field
                                        name='recaptcha'
                                        component={Captcha} />
                                </Col>}
                            </Row>

                            {Object.keys(this.props.product).length > 0 &&
                                <WarrantyClientInfo
                                    clientName={this.props.product.ClientName}
                                    shopName={this.props.product.Shop}
                                />
                            }

                            <Row>
                                <Col lg={7}>
                                    <Col lg={10} className='float-left'>
                                        <Field
                                            type='email'
                                            errorMessage={error.email || this.state.emailNotCorrect}
                                            label={emailLabel}
                                            id='warranty-email'
                                            blur={e => this.checkEmailAddress(e.target.value)}
                                            name='email'
                                            component={Text} />
                                    </Col>
                                    <Col lg={2} className='float-right visible-lg'>
                                        <GSEBall color={this.state.emailStatus} />
                                    </Col>
                                </Col>

                                <br />

                                <Col lg={3}>
                                    <Col lg={2} className='float-left visible-lg'>
                                        <GSEBall color={this.state.formStatus} />
                                    </Col>
                                    <Col lg={{ size: 9, offset: 1}} sm={{ size: 6, offset: 3 }} className='float-right' >
                                        <GSEButton title={finish} type='normal' btnType='submit' />
                                    </Col>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <br />
                {this.props.product.hasOwnProperty('Name') && <Row>
                    <Col md={7}>
                        <ProductInfo product={this.props.product} />
                    </Col>
                </Row>}
            </Col>
        );
    }
}

function validate (values) {
    const errors = {};
    const { serialNumberRequired, serialNumberFewDigits, emailNotCorrect } = getLanguageResources('errors');

    if (values.serial_number) {
        if (isNaN(values.serial_number)) {
            errors.serial_number = serialNumberFewDigits;
        }
    } else {
        errors.serial_number = serialNumberRequired;
    }

    if (values.email) {
        if (!validateEmail(values.email)) {
            errors.email = emailNotCorrect;
        }
    }

    return errors;
}

WarrantyActivation.propTypes = {
    err: PropTypes.object,
    checkSerialNumber: PropTypes.func.isRequired,
    activateProduct: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
    type: PropTypes.oneOf([ 'private', 'shop' ])
};

export default reduxForm({
    validate,
    form: 'warranty-activation'
})(WarrantyActivation);

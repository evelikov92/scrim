import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Form } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

import Text from '../fields/horizontal/Text';
import Spinner from '../../../../public/src/components/elements/spinner';
import GSEButton from '../elements/GSEButton';

import './warranty.css';
import Captcha from "../fields/Captcha";
import WarrantyClientInfo from "./WarrantyClientInfo";

/**
 *
 */
class CheckSerialNumber extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true,
            /**
             * Serial number field error
             */
            serialNumberError: ''
        };

        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount () {
        if (this.props.product.id) {
            this.props.clearWarrantyProduct();
        }
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    /**
     * Go to the page where to show the product warranty information
     */
    success () {
        if (this.props.product && this.props.product.StartDate) {
            this.props.history.push('/is-active');
        } else {
            this.setState({
                isFetchingData: true,
                serialNumberError: getLanguageResources('errors').productNotActivated
            });
        }
    }

    /**
     * Remove the spinner and show the form fields
     */
    failed () {
        this.setState({ isFetchingData: true });
    }

    /**
     *
     * @param {Number} serialNumber
     * @param {String} recaptcha
     */
    formSubmit ({ serialNumber, recaptcha }) {
        if (!this.props.account.hasOwnProperty('group')) {
            if (!recaptcha) {
                return window.alert(getLanguageResources('errors').recaptchaRequired);
            }
        }

        this.setState({ isFetchingData: false });
        if (serialNumber) {
            this.props.checkSerialNumber(serialNumber, this.success, this.failed, recaptcha || null)
        }
    }

    render () {
        let error = { serial_number: null };
        if (this.props.err && this.props.err.hasOwnProperty('data') && this.props.err.data.hasOwnProperty('errors')) {
            error = this.props.err.data.errors;
        }
        const { labels: { serialNumber }, buttons: { check }, titles: { checkProductWarranty }, warrantyActivation } = getLanguageResources();

        return (
            <Col className='check-serial-number-form warranty-status-check'>
                <Row>
                    <Col className='warranty-header' lg={4} md={5}>
                        <GSEButton title={checkProductWarranty} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col>
                        {warrantyActivation.first}
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col className='warranty-body'>
                        <Form id='check-serial-number-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='check-serial-number-form' />}

                            {/* If user is logged then captcha is not required */}
                            {!this.props.account.hasOwnProperty('group') && <Row>
                                <Col>
                                    <Field
                                        name='recaptcha'
                                        component={Captcha} />
                                </Col>
                            </Row>}

                            <Row>
                                <Col lg={8}>
                                    <Field
                                        required
                                        type='text'
                                        errorMessage={error.serialNumber || this.state.serialNumberError}
                                        label={serialNumber}
                                        id='serial-number'
                                        name='serialNumber'
                                        component={Text} />
                                </Col>

                                {/* Form submit button */}
                                <Col lg={{ size: 3, offset: 1 }}>
                                    <GSEButton title={check} type='normal' btnType='submit' />
                                </Col>
                            </Row>

                            {Object.keys(this.props.product).length > 0 &&
                                <WarrantyClientInfo
                                    shopName={this.props.product.Shop}
                                    clientName={this.props.product.ClientName}
                                />
                            }
                        </Form>
                    </Col>
                </Row>

                <br />
            </Col>
        );
    }
}

CheckSerialNumber.propTypes = {
    resetError: PropTypes.func.isRequired,
    checkSerialNumber: PropTypes.func.isRequired,
    clearWarrantyProduct: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id: PropTypes.number,
        StartDate: PropTypes.number,
        StopDate: PropTypes.number,
        Active: PropTypes.number,
        created_at: PropTypes.number
    })
};

function validate (values) {
    const errors = {};

    const { serialNumberRequired, recaptchaRequired } = getLanguageResources('errors');
    if (!values.serialNumber) {
        errors.serialNumber = serialNumberRequired;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'check-serial-number-form'
})(CheckSerialNumber);

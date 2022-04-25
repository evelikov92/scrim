import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import { getLanguageResources } from '../../../../public/src/utils/language';

import ProductInfo from '../rma/possibilities/ProductInfo';
import PageTitle from '../elements/PageTitle';
import GSEButton from '../elements/GSEButton';
import Spinner from '../../../../public/src/components/elements/spinner';
import Text from '../fields/horizontal/Text';

class Deactivate extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: true,
            serialNumberError: ''
        };

        this.failed = this.failed.bind(this);
        this.success = this.success.bind(this);
        this.successDeactivate = this.successDeactivate.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.checkSerialNumber = this.checkSerialNumber.bind(this);
    }

    componentDidMount() {
        if (this.props.product) {
            this.props.clearWarrantyProduct();
        }
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    success () {
        // Show message // You return back the cotnroller susccessuflully
        this.setState({ isFetchingData: true });
    }

    failed () {
        this.setState({ isFetchingData: true });
    }

    successDeactivate () {
        window.alert('You are deactivate the product successfully');
        this.props.history.push('/warranty/activate/shop/1');
    }

    formSubmit (values) {
        this.setState({ isFetchingData: false });
        this.props.deactivateWarranty(values.serialNumber, this.successDeactivate, this.failed);
    }

    checkSerialNumber (e) {
        let number = e.target.value;
        if (!number || isNaN(number) ||(number.length !== 4 && number.length !== 5 && number.length !== 10)) {
            this.setState({ serialNumberNotFound: getLanguageResources('errors').serialNumberNotFound });
            return this.serialNumberFailed();
        } else if (number.length === 4) {
            number = `000000${number}`;
            this.props.initialize({ serial_number: number, });
        }

        this.setState({ isFetchingData: false });
        this.props.checkSerialNumber(number, this.success, this.failed);
    }

    render () {
        const { labels: { serialNumber }, buttons: { deactivate }, navigation: { warrantyDeactivation }, warrantyDeactivate } = getLanguageResources();
        let error = {
            serial_number: null
        };
        if (this.props.err && this.props.err.hasOwnProperty('data') && this.props.err.data.hasOwnProperty('errors')) {
            error = this.props.err.data.errors;
        }

        return (
            <Col className='warranty-description warranty-choose'>
                <PageTitle className={'warranty-is-deactivate'} title={warrantyDeactivation} />

                <br />

                <Row>
                    <Col>
                        {warrantyDeactivate.first}
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col className='warranty-body'>
                        <Form id='deactivate-product-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='deactivate-product-form' />}

                            <Row>
                                <Col lg={8}>
                                    <Field
                                        required
                                        type='text'
                                        errorMessage={error.serialNumber || this.state.serialNumberError}
                                        blur={this.checkSerialNumber}
                                        label={serialNumber}
                                        id='serial-number'
                                        name='serialNumber'
                                        component={Text} />
                                </Col>

                                {/* Form submit button */}
                                <Col lg={{ size: 3, offset: 1 }}>
                                    <GSEButton title={deactivate} type='normal' btnType='submit' />
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

    const { serialNumberRequired } = getLanguageResources('errors');
    if (!values.serialNumber) {
        errors.serialNumber = serialNumberRequired;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'deactivate-product-form'
})(Deactivate);

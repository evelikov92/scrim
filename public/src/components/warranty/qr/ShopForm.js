import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Form } from 'reactstrap';

import { getLanguageResources } from "../../../../../public/src/utils/language";

import Text from '../../fields/horizontal/Text';
import GSEButton from '../../elements/GSEButton';
import Spinner from '../../../../../public/src/components/elements/spinner';
import PageTitle from '../../elements/PageTitle';

/**
 * Component for Shop to login and activate the product by scanned qr code
 */
class ShopForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true
        };

        this.failed = this.failed.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    /**
     * Stop the spinner and show the form
     */
    failed () {
        this.setState({ isFetchingData: true });
    }

    /**
     * Send request to the server for activate the warranty
     */
    formSubmit (values) {
        this.setState({ isFetchingData: false });
        this.props.qrActivation(this.props.code, values, this.props.success, this.failed)
    }

    render () {
        const { labels: { username, password }, buttons: { logIn }, roles: { wholesaler } } = getLanguageResources();

        return (
            <Row>
                <Col>
                    <PageTitle title={wholesaler} />

                    <br />

                    <Form id='shop-qr-activation-form'
                          onSubmit={this.props.handleSubmit(values => this.formSubmit(values))}>

                        {/* Show the Spinner while the data is fetching from server. */}
                        {!this.state.isFetchingData && <Spinner headTagId='shop-qr-activation-form' />}

                        <Row>
                            <Col>
                                <Field
                                    required
                                    type='text'
                                    label={username}
                                    id='account-username'
                                    name='username'
                                    component={Text} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Field
                                    required
                                    type='password'
                                    label={password}
                                    id='account-password'
                                    name='password'
                                    component={Text} />
                            </Col>
                        </Row>

                        <br />

                        {/* Form submit button */}
                        <Row>
                            <Col lg={{ size: 4, offset: 8 }} md={{ size: 6, offset: 6 }} className={'float-right'}>
                                <GSEButton title={logIn} type='normal' btnType={'submit'} />
                            </Col>
                        </Row>

                    </Form>
                </Col>
            </Row>
        );
    }
}

/**
 * Validate the form fields
 * @param {Object} values Username and password values from form
 */
function validate (values) {
    const errors = { };

    const { usernameRequired, passwordRequired } = getLanguageResources('errors');

    // Validate the username field
    if (!values.username) {
        errors.username = usernameRequired;
    }

    // Validate the password field
    if (!values.password) {
        errors.password = passwordRequired;
    }

    return errors;
}

export default reduxForm({
    form: 'shop-qr-activation',
    validate
})(ShopForm);

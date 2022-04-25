import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';
import { Field, reduxForm } from 'redux-form';
import { validateEmail } from '../../../../public/src/utils/common';

import Text from '../../../../public/src/components/fields/Text';
import Spinner from '../../../../public/src/components/elements/spinner';
import GSEButton from '../elements/GSEButton';
import Captcha from "../fields/Captcha";

/**
 * Component which will show page with form for Forgot Password
 */
class ForgotPassword extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    /**
     * Go to the next page
     */
    success () {
        this.props.history.push('/account/confirmation');
    }

    /**
     * Stop the spinner and show normal form
     */
    failed () {
        this.setState({ isFetchingData: true });
    }

    /**
     * Send request to server for new password
     * @param {Object} values Email and Captcha values from the form
     */
    formSubmit (values) {
        // Check do we have recaptcha.
        // Sometimes the validate method cannot validate the recaptcha
        if (values.recaptcha) {
            // Set isFetchingData false for can show Spinner while the Server operate with the request
            this.setState({ isFetchingData: false });
            this.props.askForNewPassword(values, this.success, this.failed);
        } else {
            window.alert(getLanguageResources('errors').recaptchaRequired);
        }
    }

    render () {
        const { titles: { forgotPassword }, labels: { email }, buttons: { next } } = getLanguageResources();

        return (
            <Col id='warranty-is-active-page'>
                {/* Show the Title box of the Page */}
                <Row className='warranty-is-active'>
                    <Col className='warranty-header' md={{ size: 6, offset: 3 }}>
                        <GSEButton title={forgotPassword} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col md={{ size: 6, offset: 3 }}>

                        <Form id='forgot-password-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='forgot-password-form' />}

                            <Row>
                                <Col>
                                    <Field
                                        required
                                        type='text'
                                        label={email}
                                        id='account-email'
                                        placeholder='Email:'
                                        name='email'
                                        component={Text} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Field
                                        name='recaptcha'
                                        component={Captcha} />
                                </Col>
                            </Row>

                            {/* Form Submit button */}
                            <Row>
                                <Col lg={{ size: 4, offset: 8 }} md={{ size: 6, offset: 6 }}>
                                    <GSEButton title={next} type='normal' btnType={'submit'} />
                                </Col>
                            </Row>

                        </Form>

                    </Col>
                </Row>

            </Col>
        )
    }
}

ForgotPassword.propTypes = {
    /**
     * Send request to server for can user set new password
     * @param {Object} data The information which will send to the server for send email for can set new password later
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    askForNewPassword: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired
};

/**
 * Validate the input fields
 * @param {Object} values Email and Captcha values
 * @return {Object} Form errors
 */
function validate (values) {
    const errors = { };

    /**
     * Validate the Email field
     */
    const { emailNotCorrect, emailRequired, recaptchaRequired } = getLanguageResources('errors');
    if (values.email) {
        if (!validateEmail(values.email)) {
            errors.email = emailNotCorrect;
        }
    } else {
        errors.email = emailRequired;
    }

    /**
     * Validate the Captcha field
     */
    if (!values.recaptcha) {
        errors.recaptcha = recaptchaRequired;
    }

    return errors;
}

export default reduxForm({
    form: 'forgot-password-form',
    validate
})(ForgotPassword);

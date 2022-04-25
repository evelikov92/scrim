import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { getLanguageResources } from '../../../../public/src/utils/language';

import Text from '../../../../public/src/components/fields/Text';
import Spinner from '../../../../public/src/components/elements/spinner';
import GSEButton from '../elements/GSEButton';

/**
 * Component which will show page with Set password form
 */
class SetPassword extends React.Component {
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
     * Go to the login page after user is set new password
     */
    success () {
        this.props.history.push('/account/login');
    }

    /**
     * Stop the spinner and show normal form
     */
    failed () {
        this.setState({ isFetchingData: true });
    }

    /**
     * Send request to the server for can User can set new password to the account
     * @param {Object} values Password, confirm password and verifier key values
     */
    formSubmit (values) {
        this.setState({isFetchingData: false});
        this.props.setNewPassword(values, this.props.match.params.token, this.success, this.failed);
    }

    render () {
        const { titles: { setPassword }, labels: { password, confirmPassword, key }, buttons: { finish } } = getLanguageResources();

        return (
            <Col id='warranty-is-active-page'>
                {/* Show the Title box of the Page */}
                <Row className='warranty-is-active'>
                    <Col className='warranty-header' md={{ size: 6, offset: 3 }}>
                        <GSEButton title={setPassword} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Form id='set-new-password-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='set-new-password-form' />}

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

                            <Row>
                                <Col>
                                    <Field
                                        required
                                        type='password'
                                        label={confirmPassword}
                                        id='account-confirm-password'
                                        name='confirm_password'
                                        component={Text} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Field
                                        required
                                        type='text'
                                        label={key}
                                        id='account-key'
                                        name='verifier'
                                        component={Text} />
                                </Col>
                            </Row>

                            {/* Form Submit button */}
                            <Row>
                                <Col lg={{ size: 4, offset: 8 }} md={{ size: 6, offset: 6 }}>
                                    <GSEButton title={finish} type='normal' btnType={'submit'} />
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Col>
        )
    }
}

SetPassword.propTypes = {
    /**
     * User set new password for him account
     * @param {Object} data New password of the user with verified token for can show is he
     * @param {String} token Authentication token of the user
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    setNewPassword: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired
};

/**
 * Validate the input fields
 * @param {Object} values Password, confirm password and verifier values
 */
function validate (values) {
    const errors = {};

    const { minimumPasswordLength, passwordNotMatched, passwordRequired, confirmPasswordRequired } = getLanguageResources('errors');

    // Validate the password field
    if (values.password) {
        if (values.password.length < 8) {
            errors.password = minimumPasswordLength;
        }
        if (values.confirm_password && values.password !== values.confirm_password) {
            errors.password = passwordNotMatched;
            errors.confirm_password = passwordNotMatched;
        }
    } else {
        errors.password = passwordRequired;
    }
    if (!values.confirm_password) {
        errors.confirm_password = confirmPasswordRequired;
    }

    return errors;
}

export default reduxForm({
    form: 'set-new-password-form',
    validate
})(SetPassword);

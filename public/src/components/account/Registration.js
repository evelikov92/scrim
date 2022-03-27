import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { getLanguageResources } from '../../utils/language';
import { validateEmail } from '../../utils/common';

import Spinner from '../elements/spinner';
import Text from '../fields/Text';

/**
 * Component which is for Shop to register on the  system
 */
class Registration extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: true,
            usernameError: '',
            emailError: ''
        };

        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    /**
     * Check do username is used from another account
     * @param {String} username
     */
    checkUsername (username) {
        if (username) {
            this.props.checkUsername(
                username,
                () => this.setState({ usernameError: '' }),
                () => this.setState({ usernameError: this.props.err.data.errors.username })
            )
        }
    }

    /**
     * Check do email is used from another account
     * @param {String} email
     */
    checkEmail (email) {
        if (email) {
            this.props.checkEmail(
                email,
                () => this.setState({ emailError: '' }),
                () => this.setState({ emailError: this.props.err.data.errors.Email })
            )
        }
    }

    /**
     * Go to the next page to show information what to do
     */
    success () {
        this.setState({ isFetchingData: true });
        this.props.history.push('/');
    }

    /**
     * Remove the spinner and show the form fields
     */
    failed () {
        this.setState({ isFetchingData: true });
    }

    /**
     *
     * @param {Object} values
     */
    formSubmit (values) {
        console.log('FORM SUBMIT');
        this.props.registration(values, this.success, this.failed);
    }

    render () {
        let error = {
            Email: null,
            username: null
        };
        if (this.props.err && this.props.err.hasOwnProperty('data')) {
            error = this.props.err.data.errors;
        }

        //const { labels: { email, username, password, confirmPassword, account }, buttons: { signUp } } = getLanguageResources();
        const email = 'Email';
        const username = 'Username';
        const password = 'Password';
        const confirmPassword = 'Confirm password';
        const account = 'Account';
        const signUp = 'Sign up';

        return (
            <Col>
                <Row>
                    <Col>

                        <Form id='registration-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))}>

                            {!this.state.isFetchingData && <Spinner headTagId='registration-form' />}



                            {/* Form for put account information. For can login in the system. */}
                            <FormGroup>
                                <legend className={'text-center'}>{account}</legend>

                                <br />

                                <Row>
                                    <Col lg={{ size: 5, offset: 1 }} sm={12}>
                                        <Field
                                            errorMessage={this.state.usernameError}
                                            blur={e => this.checkUsername(e.target.value)}
                                            required
                                            type='text'
                                            label={username}
                                            id='username'
                                            name='username'
                                            component={Text} />
                                    </Col>

                                    <Col lg={{ size: 5 }} sm={12}>
                                        <Field
                                            errorMessage={this.state.emailError}
                                            blur={e => this.checkEmail(e.target.value)}
                                            required
                                            type='email'
                                            label={email}
                                            id='email'
                                            name='email'
                                            component={Text} />
                                    </Col>
                                </Row>

                                <Row>

                                    <Col lg={{ size: 5, offset: 1 }} sm={12}>
                                        <Field
                                            required
                                            type='password'
                                            label={password}
                                            id='password'
                                            name='password'
                                            component={Text} />
                                    </Col>

                                    <Col lg={{ size: 5 }} sm={12}>
                                        <Field
                                            required
                                            type='password'
                                            label={confirmPassword}
                                            id='confirm-password'
                                            name='confirm_password'
                                            component={Text} />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <Row>
                                <Col lg={{ size: 2, offset: 10 }}>
                                    <Button size={'sm'} type={'submit'}>{signUp}</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Col>
                </Row>
            </Col>
        );
    }
}

/**
 * Validate the form fields
 * @param {Object} values all form field values
 */
function validate (values) {
    const errors = {};

    // const {
    //     minimumPasswordLength,
    //     passwordNotMatched,
    //     passwordRequired,
    //     confirmPasswordRequired,
    //     minimumUsernameLength,
    //     maximumUsernameLength,
    //     usernameRequired,
    //     emailRequired,
    //     emailNotCorrect,
    // } = getLanguageResources('errors');

    const minimumPasswordLength = '';
    const passwordNotMatched = '';
    const passwordRequired = '';
    const confirmPasswordRequired = '';
    const minimumUsernameLength = '';
    const maximumUsernameLength = '';
    const usernameRequired = '';
    const emailRequired = '';
    const emailNotCorrect = '';

    // Validate the Email field
    if (values.Email) {
        if (!validateEmail(values.Email)) {
            errors.Email = emailNotCorrect;
        }
    } else {
        errors.Email = emailRequired;
    }

    // Validate the password field
    if (values.password) {
        if (values.password.length < 6) {
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

    // Validate the username field
    if (values.username) {
        if (values.username.length < 6) {
            errors.username = minimumUsernameLength;
        } else if (values.username.length > 50) {
            errors.username = maximumUsernameLength;
        }
    } else {
        errors.username = usernameRequired;
    }


    return errors;
}

Registration.propTypes = {
    /**
     * Send request to the server to check do username which user is enter is used from another account
     * @param {String} username The username which user is enter on input field
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    checkUsername: PropTypes.func.isRequired,
    /**
     * Send request to the server to check do email which user is enter is used from another account
     * @param {String} Email The email which user is enter on input field
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    checkEmail: PropTypes.func.isRequired,
    /**
     * Create the shop account
     * @param {Object} user The user information which need for create Shop account
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    createWholesaleUser: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired,
    /**
     * Errors on redux store
     */
    err: PropTypes.object
};

export default reduxForm({
    form: 'registration-form',
    validate
})(Registration);

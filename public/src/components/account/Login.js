import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Col, Row } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

import Text from '../fields/horizontal/Text';
import Checkbox from '../fields/Checkbox';

import Spinner from '../../../../public/src/components/elements/spinner';
import GSEButton from '../elements/GSEButton';

/**
 * Component which will show page with form for login
 */
class Login extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true,
            /**
             * Is show do user want to remember the login status
             */
            remember_me: true,
        };

        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount () {
        this.props.removeError();
    }

    /**
     * Go to the home page of the RMA app
     */
    success () {
        this.props.history.push('/')
    }

    /**
     * Stop the spinner and show normal form
     */
    failed () {
        this.setState({ isFetchingData: true });
    }

    /**
     * Try to login to the system
     * @param {Object} values Username and password of the account
     */
    formSubmit (values) {
        this.setState({isFetchingData: false});
        this.props.login({...values, remember_me: this.state.remember_me}, this.success, this.failed);
    }

    render () {
        const { buttons: { logIn, signUp }, labels: { username, password, forgotPassword, rememberMe } } = getLanguageResources();

        return (
            <Col id='warranty-is-active-page'>
                {/* Show the Title box of the Page */}
                <Row className='warranty-is-active'>
                    <Col className='warranty-header' md={{ size: 6, offset: 3 }}>
                        <GSEButton title={logIn} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Form id='login-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))}>

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='login-form' />}

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

                            <Row>
                                <Col>
                                    <Field
                                        id='account-remember-me'
                                        label={rememberMe}
                                        name='rememberMe'
                                        isChecked={this.state.remember_me}
                                        onChange={() => this.setState({ remember_me: !this.state.remember_me })}
                                        component={Checkbox} />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Link to='/account/forgot-password'>{forgotPassword}</Link>
                                </Col>
                            </Row>

                            <br />

                            <Row>
                                {/* Button which link to Shop registration page */}
                                <Col lg={{ size: 4, offset: 0 }} md={{ size: 5, offset: 1 }} className={'float-left'}>
                                    <GSEButton
                                        component={Link}
                                        componentProps={{ to: '/wholesaler/registration' }}
                                        title={signUp}
                                        type='normal' />
                                </Col>

                                {/* Form Submit button */}
                                <Col lg={{ size: 4, offset: 4 }} md={{ size: 6, offset: 6 }} className={'float-right'}>
                                    <GSEButton title={logIn} type='normal' btnType={'submit'} />
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
            </Col>
        );
    }
}

Login.propTypes = {
    /**
     * Login to the system
     * @param {Object} user Username and password to send to server for authentication
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    login: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired
};

/**
 * Validate the input fields
 * @param {Object} values Username and password values
 * @return {Object} Form errors
 */
function validate (values) {
    const errors = {};

    /**
     * Validate the username field
     */
    const { usernameRequired, passwordRequired } = getLanguageResources('errors');
    if (!values.username) {
        errors.username = usernameRequired;
    }

    /**
     * Validate the password field
     */
    if (!values.password) {
        errors.password = passwordRequired;
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'login-form',
})(Login);

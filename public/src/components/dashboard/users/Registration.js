import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form'
import { Card, CardBody, Button, Form, FormGroup, Col, Row } from 'reactstrap';
import { getLanguageResources } from "../../../../../public/src/utils/language";
import { validateEmail } from "../../../../../public/src/utils/common";

import Text from '../../../../../public/src/components/fields/Text'
import Select from '../../fields/horizontal/Select';

import Spinner from '../../../../../public/src/components/elements/spinner/index';


class Registration extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            usernameError: '',
            emailError: '',
            group: 1
        };

        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    checkEmail (email) {
        if (email) {
            this.props.checkEmail(
                email,
                () => this.setState({ emailError: '' }),
                () => this.setState({ emailError: this.props.err.data.errors.Email })
            )
        }
    }

    checkUsername (username) {
        if (username) {
            this.props.checkUsername(
                username,
                () => this.setState({ usernameError: '' }),
                () => this.setState({ usernameError: this.props.err.data.errors.username })
            )
        }
    }

    success () {
        this.props.history.push('/dashboard/users');
    }

    failed () {
        this.setState({ isFetchingData: false });
    }

    formSubmit (values) {
        if (!this.state.usernameError && !this.state.emailError) {
            this.setState({ isFetchingData: true });
            this.props.registration({ ...values, group: this.state.group }, this.success, this.failed);
        }
    }

    render () {
        const { buttons: { signUp }, labels: { email, username, password, confirmPassword, role }, roles } = getLanguageResources();

        let error = {
            email: null,
            username: null,
            password: null,
            confirm_password: null
        };
        if (this.props.err && this.props.err.hasOwnProperty('data')) {
            error = this.props.err.data.errors;
        }

        return (
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Form id='registration-form'
                                  onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                                {this.state.isFetchingData && <Spinner headTagId='registration-form' />}

                                <FormGroup tag='fieldset'>
                                    <legend className='text-center'>{signUp}</legend>

                                    <br />

                                    <Row>
                                        <Col md='6'>
                                            <Field
                                                required
                                                type='email'
                                                errorMessage={this.state.emailError}
                                                blur={e => this.checkEmail(e.target.value)}
                                                label={email}
                                                id='account-email'
                                                name='email'
                                                component={Text} />
                                        </Col>

                                        <Col md='6'>
                                            <Field
                                                required
                                                type='text'
                                                errorMessage={this.state.usernameError}
                                                blur={e => this.checkUsername(e.target.value)}
                                                label={username}
                                                id='account-username'
                                                name='username'
                                                component={Text} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md='6'>
                                            <Field
                                                required
                                                type='password'
                                                errorMessage={error.password}
                                                label={password}
                                                id='account-password'
                                                name='password'
                                                component={Text} />
                                        </Col>

                                        <Col md='6'>
                                            <Field
                                                required
                                                type='password'
                                                errorMessage={error.confirm_password}
                                                label={confirmPassword}
                                                id='account-confirm-password'
                                                name='confirm_password'
                                                component={Text} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Field
                                                type='select'
                                                errorMessage={error.group}
                                                label={role}
                                                id='account-group'
                                                onBlur={(e) => this.setState({ group: e.target.value })}
                                                name='group'
                                                component={Select}>

                                                <option key={1} value={1}>{roles.administrator}</option>
                                                <option key={2} value={2}>{roles.operator}</option>
                                                <option key={4} value={4}>{roles.translator}</option>

                                            </Field>
                                        </Col>
                                    </Row>

                                    <Button type='submit' color='success' className='float-right'>{signUp}</Button>

                                </FormGroup>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

Registration.propTypes = {
    registration: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired
};

function validate (values) {
    const errors = {};

    const { emailRequired, emailNotCorrect, minimumPasswordLength, passwordNotMatched, passwordRequired, confirmPasswordRequired, usernameRequired, minimumUsernameLength, maximumUsernameLength } = getLanguageResources('errors');

    // Validate the email address
    if (values.email) {
        if (!validateEmail(values.email)) {
            errors.email = emailNotCorrect;
        }
    } else {
        errors.email = emailRequired;
    }

    // Validate the password
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

    // Validate the username
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

export default reduxForm({
    validate,
    form: 'registration-form',
})(Registration);

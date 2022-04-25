import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Form } from 'reactstrap';

import { validateEmail } from "../../../../../public/src/utils/common";
import { getLanguageResources } from "../../../../../public/src/utils/language";

import Spinner from '../../../../../public/src/components/elements/spinner/index';
import GSEButton from '../../elements/GSEButton';

import Text from '../../fields/horizontal/Text';
import Select from '../../fields/horizontal/Select';

class EditUser extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            group: 1
        };

        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.finish = this.finish.bind(this);
        this.renderForm = this.renderForm.bind(this);
    }

    formSubmit (values) {
        this.setState({ isFetchingData: false });
        this.props.updateUser({ id: this.props.user.id, ...values, group: this.state.group }, 2, this.success, this.failed);
    }

    success () {
        this.setState({ isFetchingData: true });
        this.props.history.push('/dashboard/users');
    }

    failed () {
        this.setState({ isFetchingData: true });
    }

    finish () {
        let { email, username, role } = this.props.user;
        this.props.initialize({ email, username });

        let group = 0;
        if (this.props.user.role === 'Administrator') {
            group = 1;
        } else if (this.props.user.role === 'Operation') {
            group = 2;
        } else if (this.props.user.role === 'Translator') {
            group = 4;
        }
        this.setState({ isFetchingData: true, group });
    }

    componentDidMount () {
        if (!this.props.user || Number(this.props.user.id) !== Number(this.props.match.params.id)) {
            this.props.getUser(this.props.match.params.id, this.finish);
        } else {
            this.finish();
        }
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    renderForm () {
        const { labels: { username, email, role }, roles, buttons: { finish } } = getLanguageResources();

        let error = {
            email: null,
            username: null,
            group: null
        };

        if (this.props.err && this.props.err.hasOwnProperty('data')) {
            error = this.props.err.data.errors;
        }

        if (this.props.user) {
            return (
                <Form onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >
                    <Row>
                        <Col>
                            <Field
                                required
                                type='text'
                                errorMessage={error.username}
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
                                type='email'
                                errorMessage={error.email}
                                label={email}
                                id='account-email'
                                name='email'
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
                                value={this.state.group}
                                name='group'
                                component={Select}>

                                <option key={1} value={1} selected={this.props.user.role === 'Administrator'}>{roles.administrator}</option>
                                <option key={2} value={2} selected={this.props.user.role === 'Operator'}>{roles.operator}</option>
                                <option key={4} value={4} selected={this.props.user.role === 'Translator'}>{roles.translator}</option>

                            </Field>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col>
                            <GSEButton title={finish} type='normal' btnType='submit' />
                        </Col>
                    </Row>
                </Form>
            );
        } else {
            return null;
        }
    }

    render () {
        return (
            <Col id='edit-user-form' lg={{ size: 6, offset: 3 }} md={{ size: 8, offset: 2 }} >
                {!this.state.isFetchingData && <Spinner headTagId='edit-user-form' />}

                {this.renderForm()}
            </Col>
        );
    }
}

function validate (values) {
    const errors = { };

    if (values.email) {
        if (!validateEmail(values.email)) {
            // show email not valid
        }
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'edit-user-account'
})(EditUser);

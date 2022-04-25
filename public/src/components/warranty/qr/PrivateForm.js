import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Form } from 'reactstrap';

import { getLanguageResources } from '../../../../../public/src/utils/language';
import { validateEmail } from '../../../../../public/src/utils/common';

import Spinner from '../../../../../public/src/components/elements/spinner';
import PageTitle from '../../elements/PageTitle';
import GSEButton from '../../elements/GSEButton';
import Captcha from '../../fields/Captcha';
import Text from '../../fields/horizontal/Text';

/**
 * Component for Private person to send email to the server
 */
class PrivateForm extends React.Component {
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
     * Send user email to server to activate the product with qr code for 3 years
     */
    formSubmit (values) {
        this.setState({ isFetchingData: false });
        this.props.qrActivation(this.props.code, values, this.props.success, this.failed);
    }

    render () {
        const { labels: { email, client }, buttons: { finish } } = getLanguageResources();

        return (
            <Row>
                <Col>
                    <PageTitle title={client} />

                    <br />

                    <Form id='client-qr-activation-form'
                          onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                        {/* Show the Spinner while the data is fetching from server. */}
                        {!this.state.isFetchingData && <Spinner headTagId={'client-qr-activation-form'} />}

                        <Row>
                            <Col>
                                <Field
                                    type='email'
                                    label={email}
                                    id='warranty-email'
                                    name='email'
                                    component={Text} />
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <Field
                                    name='recaptcha'
                                    component={Captcha} />
                            </Col>
                        </Row>

                        <br />

                        {/* Form submit button */}
                        <Row>
                            <Col lg={{ size: 2, offset: 10 }} sm={{ size: 6, offset: 6 }} className='float-right' >
                                <GSEButton title={finish} type='normal' btnType='submit' />
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
 * @param {Object} values Email value from form
 */
function validate (values) {
    const errors = { };

    const { emailNotCorrect, emailRequired } = getLanguageResources('errors');

    // Validate email field
    if (!values.email) {
        errors.email = emailRequired;
    } else {
        if (!validateEmail(values.email)) {
            errors.email = emailNotCorrect
        }
    }

    return errors;
}

PrivateForm.propTypes = {
    /**
     * Callback for execution on successfully response from server
     */
    success: PropTypes.func.isRequired,
    /**
     * Send request to server for activate the warranty
     */
    qrActivation: PropTypes.func.isRequired,
    /**
     * QR code
     */
    code: PropTypes.string.isRequired
};

export default reduxForm({
    validate,
    form: 'client-qr-activation',
})(PrivateForm);

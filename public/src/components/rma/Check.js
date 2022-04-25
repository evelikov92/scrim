import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Table } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import { validateEmail } from '../../../../public/src/utils/common';
import { getLanguageResources } from '../../../../public/src/utils/language';

import Text from '../fields/horizontal/Text';
import GSEButton from '../elements/GSEButton';
import Spinner from '../../../../public/src/components/elements/spinner/index';
import Captcha from "../fields/Captcha";
import PageTitle from '../elements/PageTitle';

/**
 * Component for show the page where client can check their RMA status
 */
class CheckRma extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true,
            /**
             * Do have error with the email
             */
            emailError: null
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.finish = this.finish.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    componentWillUnmount () {
        this.props.removeError();
        this.props.clearRmaStatus();
    }

    /**
     * Send information to the server for can draw the information about the RMA
     */
    formSubmit (values) {
        // Check do need to send captcha code
        if (!this.props.account.hasOwnProperty('group')) {
            if (!values.recaptcha) {
                return window.alert(getLanguageResources('errors').recaptchaRequired);
            }
        }

        this.setState({ isFetchingData: false });
        this.props.getRmaStatus(values, this.finish);
    }

    /**
     * Stop the spinner and show normal form
     */
    finish () {
        this.setState({ isFetchingData: true });
    }

    /**
     * Check do email is valid
     * @param {String} email
     */
    checkEmail (email) {
        const { emailNotCorrect } = getLanguageResources('errors');
        if (!validateEmail(email)) {
            this.setState({ emailError: emailNotCorrect });
        }
    }

    render () {
        let error = { number: null, email: null };
        if (this.props.err && this.props.err.hasOwnProperty('data') && this.props.err.data.hasOwnProperty('errors')) {
            error = this.props.err.data.errors;
        }

        const { checkRmaInfo, rmaStats, titles: { rmaStatus }, buttons: { check }, dashboardSidebar: { rma },  labels: { serial, product, status, lastUpdate, notArrived, rmaNumber, email }} = getLanguageResources();

        let statusContent = null;
        if (this.props.status.length) {
            // Show the information about the RMA which is founded
            statusContent = (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th colSpan={5} className='text-center table-vertical-align'>{rmaStatus}</th>
                        </tr>
                        <tr>
                            <th className='table-vertical-align'>{rma}</th>
                            <th className='table-vertical-align'>{serial}</th>
                            <th className='table-vertical-align'>{product}</th>
                            <th className='table-vertical-align'>{status}</th>
                            <th className='table-vertical-align'>{lastUpdate}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.status.map((stat, i) => {
                            return (
                                <tr key={i}>
                                    <td className='table-vertical-align'>{stat.rma}</td>
                                    <td className='table-vertical-align'>{stat.serialNumber}</td>
                                    <td className='table-vertical-align'>{stat.product}</td>
                                    <td className='table-vertical-align'>{rmaStats[stat.status || Number(stat.itemStatus)]}</td>
                                    <td className='table-vertical-align'>{stat.updated || notArrived}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )
        }

        return (
            <Col>
                <PageTitle className={'warranty-header'} title={rmaStatus} />

                <br />

                <Row>
                    <Col>
                        {checkRmaInfo.first}
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col>
                        <Form id='check-rma-status-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='check-rma-status-form' />}

                            {/* If user is logged then captcha is not required */}
                            {!this.props.account.hasOwnProperty('group') && <Row>
                                <Col>
                                    <Field
                                        name='recaptcha'
                                        component={Captcha} />
                                </Col>
                            </Row>}

                            <Row>
                                <Col lg={5} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        errorMessage={error.number}
                                        label={rmaNumber}
                                        id='rma-number'
                                        name='number'
                                        component={Text} />
                                </Col>

                                <Col lg={{ size: 5, offset: 2 }} md={{ size: 6, offset: 0 }}>
                                    <Field
                                        required
                                        type='email'
                                        errorMessage={error.email || this.state.emailError}
                                        label={email}
                                        id='email'
                                        blur={e => this.checkEmail(e.target.value)}
                                        name='email'
                                        component={Text} />
                                </Col>
                            </Row>

                            <br />

                            <Row>
                                <Col>
                                    {statusContent}
                                </Col>
                            </Row>

                            {/* Form submit button */}
                            <Row>
                                <Col lg={{ size: 3, offset: 9 }} className='float-left' >
                                    <GSEButton title={check} type='normal' btnType='submit' />
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
 * @param {Object} values email and rma number values
 */
function validate (values) {
    const errors = { };

    const { checkRmaInfo: { second }, errors: { emailNotCorrect, rmaNumberNotCorrect, emailRequired } } = getLanguageResources();

    // Validate the email field
    if (values.email) {
        if (!validateEmail(values.email)) {
            errors.email = emailNotCorrect;
        }
    } else {
        errors.email = emailRequired;
    }

    // Validate the RMA number field
    if (values.number) {
        if (isNaN(values.number)) {
            errors.number = rmaNumberNotCorrect;
        } else if (values.number.length !== 4) {
            errors.number = second;
        }
    }

    return errors;
}

CheckRma.propTypes = {
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired,
    /**
     * Clear the RMA object from store
     * @returns {{type: string}} String for reducer
     */
    clearRmaStatus: PropTypes.func.isRequired,
    /**
     * Errors on redux store
     */
    err: PropTypes.object,
    /**
     * User account
     */
    account: PropTypes.object,
    /**
     * Get the RMA Items from the server and show the client the status of any rma item
     * @param {Object} data Email and Rma number put it from client
     * @param {Function} finish Action which will execute when the request is finish
     */
    getRmaStatus: PropTypes.func.isRequired,
    /**
     * Rma items which is found
     */
    status: PropTypes.object
};

export default reduxForm({
    form: 'check-rma-status-form',
    validate
})(CheckRma);

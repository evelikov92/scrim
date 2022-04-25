import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Form, FormGroup, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import Text from '../fields/horizontal/Text';
import Telephone from '../fields/horizontal/Telephone';

import Spinner from '../../../../public/src/components/elements/spinner/index';
import GSEButton from '../elements/GSEButton';

import { getLanguageResources } from '../../../../public/src/utils/language';
import Captcha from '../fields/Captcha';
import countries from '../countries.json';
import { validateEmail } from '../../../../public/src/utils/common';

/**
 * Component which show form for create client for the new created RMA
 */
class CreateClient extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true,
            /**
             * Telephone number of the client
             */
            telephoneNumber: null,
            /**
             * Country of the client
             */
            country: 'Afghanistan',
            /**
             * Username of the shop
             */
            shopUsername: '',
            /**
             * Password of the shop
             */
            shopPassword: ''
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.success = this.success.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.logInShop = this.logInShop.bind(this);
        this.getLoggedShop = this.getLoggedShop.bind(this);
    }

    componentDidMount () {
        // Check do Shop is already logged
        if (this.props.account) {
            this.props.getLoggedWholesaler(this.getLoggedShop, () => alert('Something happen with the server'));
        }
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    /**
     * Put the information about the shop
     */
    getLoggedShop () {
        this.props.initialize(this.props.client);
        this.setState({ telephoneNumber: this.props.client.Telephone, country: this.props.client.Country, isFetchingData: true });
    }

    /**
     * Send request to server for create client for RMA
     * @param {Object} values Whole information of the RMA Client
     */
    formSubmit (values) {
        // Check do need to send captcha code
        if (!this.props.account.hasOwnProperty('group')) {
            if (!values.recaptcha) {
                return window.alert(getLanguageResources('errors').recaptchaRequired);
            }
        }

        let client = {
            ...values,
            Telephone: this.state.telephoneNumber,
            Company: values.Company || '',
            Additional: values.Additional || '',
            Country: this.state.country
        };

        this.setState({isFetchingData: false});
        this.props.createClient(client, this.props.match.params.number, this.success, () => this.setState({isFetchingData: true}));
    }

    /**
     * Go to the page where is show to the client what to do
     */
    success () {
        this.props.history.push(`/rma/create/pdf/${this.props.match.params.number}`);
    }

    /**
     * Change the phone number
     * @param {String} number Phone number of the client
     * @param {String} country Country when the client live
     */
    handlePhoneChange (number, country) {
        const name = country.name.split('(')[0].trim();
        this.setState({  telephoneNumber: number, country: name });
    }

    /**
     * Try to log in as Shop on application
     */
    logInShop () {
        if (this.state.shopUsername && this.state.shopPassword) {
            this.setState({ isFetchingData: false });
            let shop = { username: this.state.shopUsername, password: this.state.shopPassword, remember_me: false };
            this.props.logInAsShop(shop, this.getLoggedShop, () => this.setState({ isFetchingData: true }));
        }
    }

    render () {
        const { titles: { clientInfo }, labels: { name, surname, company, additional, country, city, postCode, address, telephone, email, username, password }, buttons: { next, logIn } } = getLanguageResources();

        return (
            <Col>
                <Row>
                    <Col className='warranty-header' lg={4} md={5}>
                        <GSEButton title={clientInfo} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col>

                        <Form id='create-rma-client-form'
                              onSubmit={this.props.handleSubmit(values => this.formSubmit(values))}>

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='create-rma-client-form' />}

                            {/* If user is logged then captcha is not required */}
                            {!this.props.client.hasOwnProperty('Telephone') && <Row>
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
                                        label={name}
                                        id='client-name'
                                        name='Name'
                                        component={Text} />
                                </Col>

                                <Col lg={{ size: 5, offset: 2 }} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={surname}
                                        id='client-surname'
                                        name='Surname'
                                        component={Text} />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={5} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={company}
                                        id='client-company'
                                        name='Company'
                                        component={Text} />
                                </Col>

                                <Col lg={{ size: 5, offset: 2 }} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={additional}
                                        id='client-additional'
                                        name='Additional'
                                        component={Text} />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={5} md={6}>
                                    <FormGroup row>
                                        <Label md={5} htmlFor={'client-country'}>{country}</Label>
                                        <Col md={7}>
                                            <select
                                                id={'client-country'}
                                                onChange={e => this.setState({ country: e.target.value })}
                                                className={'form-control is-valid'}
                                                value={this.state.country}>
                                                {countries.map(country => {
                                                    return (
                                                        <option key={country.name} value={country.name}>{country.name}</option>
                                                    );
                                                })}
                                            </select>
                                        </Col>
                                    </FormGroup>
                                </Col>

                                <Col lg={{ size: 5, offset: 2 }} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={city}
                                        id='client-city'
                                        name='City'
                                        component={Text} />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={5} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={postCode}
                                        id='client-postcode'
                                        name='Postcode'
                                        component={Text} />
                                </Col>

                                <Col lg={{ size: 5, offset: 2 }} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={address}
                                        id='clietn-address'
                                        name='Address'
                                        component={Text} />
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={5} md={6}>
                                    <Field required
                                           label={telephone}
                                           component={Telephone}
                                           className='telephone-input'
                                           name='Telephone'
                                           defaultCountry='af'
                                           handlePhoneChange={this.handlePhoneChange} />
                                </Col>

                                <Col lg={{ size: 5, offset: 2 }} md={6}>
                                    <Field
                                        required
                                        type='email'
                                        label={email}
                                        id='client-email'
                                        name='Email'
                                        component={Text} />
                                </Col>
                            </Row>

                            {/* Form submit button */}
                            <Row>
                                <Col lg={{ size: 2, offset: 10 }}>
                                    <GSEButton title={next} type='normal' btnType='submit' />
                                </Col>
                            </Row>

                        </Form>

                        <br />
                        <br />

                        {/* Form for shop can login to system to used the information which give on registration form */}
                        {!this.props.client.hasOwnProperty('Telephone') && <FormGroup>
                            <legend className={'text-center'}>{logIn}</legend>

                            <br />

                            <Row>
                                <Col lg={5}>
                                    <Field
                                        required
                                        type='text'
                                        label={username}
                                        value={this.state.shopUsername}
                                        onChange={(e) => this.setState({ shopUsername: e.target.value })}
                                        id='wholesale-username'
                                        name='username'
                                        component={Text} />
                                </Col>

                                <Col lg={5}>
                                    <Field
                                        required
                                        type='password'
                                        label={password}
                                        value={this.state.shopPassword}
                                        onChange={(e) => this.setState({ shopPassword: e.target.value })}
                                        id='wholesale-password'
                                        name='password'
                                        component={Text} />
                                </Col>

                                <Col lg={2}>
                                    <GSEButton title={logIn} type='normal' btnType='button' click={this.logInShop} />
                                </Col>
                            </Row>
                        </FormGroup>}

                    </Col>
                </Row>

                <br />
            </Col>
        );
    }
}

/**
 * Validate the form fields
 * @param values all form values
 */
function validate (values) {
    const errors = {};

    const {
        emailRequired,
        emailNotCorrect,
        nameRequired,
        surnameRequired,
        streetRequired,
        postalRequired,
        cityRequired,
        nameTooShort,
        nameTooLong,
        surnameTooShort,
        surnameTooLong,
        companyTooShort,
        companyTooLong,
        addressTooShort,
        addressTooLong,
        postcodeTooShort,
        postcodeTooLong,
        cityTooShort,
        cityTooLong
    } = getLanguageResources('errors');

    // Validate Email address of the client
    if (values.Email) {
        if (!validateEmail(values.Email)) {
            errors.Email = emailNotCorrect;
        }
    } else {
        errors.Email = emailRequired;
    }

    // Validate client name
    if (values.Name) {
        if (values.Name.length < 2) {
            errors.Name = nameTooShort;
        } else if (values.Name.length > 60) {
            errors.Name = nameTooLong;
        }
    } else {
        errors.Name = nameRequired;
    }

    // Validate client surname
    if (values.Surname) {
        if (values.Surname.length < 2) {
            errors.Surname = surnameTooShort;
        } else if (values.Surname.length > 60) {
            errors.Surname = surnameTooLong;
        }
    } else {
        errors.Surname = surnameRequired;
    }

    // Validate client company
    if (values.Company) {
        if (values.Company.length < 2) {
            errors.Company = companyTooShort;
        } else if (values.Company.length > 60) {
            errors.Company = companyTooLong;
        }
    }

    // Validate client address
    if (values.Address) {
        if (values.Address.length < 4) {
            errors.Address = addressTooShort;
        } else if (values.Address.length > 100) {
            errors.Address = addressTooLong;
        }
    } else {
        errors.Address = streetRequired;
    }

    // Validate client postcode
    if (values.Postcode) {
        if (values.Postcode.length < 3) {
            errors.Postcode = postcodeTooShort;
        } else if (values.Postcode.length > 10) {
            errors.Postcode = postcodeTooLong;
        }
    } else {
        errors.Postcode = postalRequired;
    }

    // Validate client city
    if (values.City) {
        if (values.City.length < 2) {
            errors.City = cityTooShort;
        } else if (values.City.length > 50) {
            errors.City = cityTooLong;
        }
    } else {
        errors.City = cityRequired;
    }

    return errors;
}

CreateClient.propTypes = {
    /**
     * Check do that user can create that RMA
     * @param {Number} number The id of the new created RMA
     * @param {Function} finish Action which will execute when the request is finish
     */
    checkClient: PropTypes.func.isRequired,
    /**
     * User account
     */
    account: PropTypes.object,
    /**
     * Try to get logged shop account. Is used when is need to create client for RMA
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    getLoggedWholesaler: PropTypes.func.isRequired,
    /**
     * Shop information used for create the RMA client
     */
    client: PropTypes.object,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired,
    /**
     * Create client for the RMA document
     * @param {Object} client RMA Registration form for client
     * @param {Number} number The id of the new created RMA
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    createClient: PropTypes.func.isRequired,
    /**
     * Try to login in the system as a shop for can get the information for create RMA client
     * @param {Object} user Username and password of the Shop
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    logInAsShop: PropTypes.func.isRequired
};

export default reduxForm({
    validate,
    form: 'create-rma-client'
})(CreateClient);

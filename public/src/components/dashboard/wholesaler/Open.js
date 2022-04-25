import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, FormGroup, Label} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import GSEButton from '../../elements/GSEButton'
import Spinner from '../../../../../public/src/components/elements/spinner';
import profile from './account.png';
import { getLanguageResources } from '../../../../../public/src/utils/language';
import Text from "../../fields/horizontal/Text";
import countries from "../../countries.json";
import Telephone from "../../fields/horizontal/Telephone";
import {validateEmail} from "../../../../../public/src/utils/common";

class Wholesaler extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            country: '',
            telephoneNumber: ''
        };

        this.setFormData = this.setFormData.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.finish = this.finish.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    componentDidMount () {
        this.props.getActiveWholesaler(this.props.match.params.id, this.setFormData);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    setFormData () {
        this.props.initialize(this.props.wholesaler);
        this.setState({
            isFetchingData: true,
            country: this.props.wholesaler.Country,
            telephoneNumber: this.props.wholesaler.Telephone
        });
    }

    formSubmit (values) {
        this.setState({ isFetchingData: false });
        const data = { ...values, Country: this.state.country, Telephone: this.state.telephoneNumber };
        this.props.editWholesalerAccount(this.props.match.params.id, data, this.finish);
    }

    finish () {
        this.setState({ isFetchingData: true });
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

    render () {
        const { labels: { username, name, vat, surname, company, country, city, postCode, address, telephone, email, }, buttons: { update } } = getLanguageResources();

        return (
            <Col>
                <Row>
                    <Col className='warranty-header' lg={4} md={5}>
                        <GSEButton title={'Wholesaler'} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col>
                        <Form id='wholesaler-form'
                              onSubmit={this.props.handleSubmit(this.formSubmit)}>

                            {/* Show the Spinner while the data is fetching from server. */}
                            {!this.state.isFetchingData && <Spinner headTagId='wholesaler-form' />}

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
                                        label={vat}
                                        id='client-vat'
                                        name='vat'
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
                                        id='client-address'
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

                            {/* Form submit button and added username */}
                            <Row>
                                <Col lg={5} md={6}>
                                    <Field
                                        required
                                        type='text'
                                        label={username}
                                        id='client-username'
                                        name='username'
                                        component={Text} />
                                </Col>

                                <Col lg={{ size: 2, offset: 5 }} md={6}>
                                    <GSEButton title={update} type='normal' btnType='submit' />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Col>
        );
    }
}

function validate (values) {
    const errors = { };

    const {
        emailRequired,
        emailNotCorrect,
        nameRequired,
        surnameRequired,
        companyRequired,
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

    // Validate the Email field
    if (values.Email) {
        if (!validateEmail(values.Email)) {
            errors.Email = emailNotCorrect;
        }
    } else {
        errors.Email = emailRequired;
    }

    // Validate the Name field
    if (values.Name) {
        if (values.Name.length < 2) {
            errors.Name = nameTooShort;
        } else if (values.Name.length > 60) {
            errors.Name = nameTooLong;
        }
    } else {
        errors.Name = nameRequired;
    }

    // Validate the Surname field
    if (values.Surname) {
        if (values.Surname.length < 2) {
            errors.Surname = surnameTooShort;
        } else if (values.Surname.length > 60) {
            errors.Surname = surnameTooLong;
        }
    } else {
        errors.Surname = surnameRequired;
    }

    // Validate the Company field
    if (values.Company) {
        if (values.Company.length < 2) {
            errors.Company = companyTooShort;
        } else if (values.Company.length > 60) {
            errors.Company = companyTooLong;
        }
    } else {
        errors.Company = companyRequired
    }

    // Validate the Address field
    if (values.Address) {
        if (values.Address.length < 4) {
            errors.Address = addressTooShort;
        } else if (values.Address.length > 100) {
            errors.Address = addressTooLong;
        }
    } else {
        errors.Address = streetRequired;
    }

    // Validate the Postcode field
    if (values.Postcode) {
        if (values.Postcode.length < 3) {
            errors.Postcode = postcodeTooShort;
        } else if (values.Postcode.length > 10) {
            errors.Postcode = postcodeTooLong;
        }
    } else {
        errors.Postcode = postalRequired;
    }

    // Validate the City field
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

export default reduxForm({
    validate,
    form: 'wholesaler-form'
})(Wholesaler);


/*

class OpenWholesaler extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false
        };
    }

    componentDidMount () {
        this.props.getActiveWholesaler(
            this.props.match.params.id,
            () => this.setState({ isFetchingData: true })
        );
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    render () {
        let wholesalerContent = null;
        const { email, name, address, telephone, country, city, company, postCode, vat } = getLanguageResources('labels');
        if (this.state.isFetchingData) {
            wholesalerContent = (
                <Row>
                    <Col sm={2}>
                        <img src={profile} className='img-fluid img-thumbnail' />
                    </Col>
                    <Col sm={10}>
                        <Row>
                            <Col>
                                <strong>{name}:</strong> {this.props.wholesaler.Name} {this.props.wholesaler.Surname}
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <strong>{email}:</strong> <a href={`mailto:${this.props.wholesaler.Email}`}>{this.props.wholesaler.Email}</a>
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <strong>{company}:</strong> {this.props.wholesaler.Company} <strong>{vat}:</strong> {this.props.wholesaler.vat}
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <strong>{telephone}:</strong> {this.props.wholesaler.Telephone}
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <strong>{country}:</strong> {this.props.wholesaler.Country}, <strong>{city}:</strong> {this.props.wholesaler.City} <strong>{postCode}:</strong> {this.props.wholesaler.Postcode}
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <strong>{address}:</strong> {this.props.wholesaler.Address}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        }

        return (
            <Col id='wholesaler-account'>
                {!this.state.isFetchingData ? <Spinner headTagId='wholesaler-account'/> : wholesalerContent}
            </Col>
        );
    }
}

export default OpenWholesaler;

*/
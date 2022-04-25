import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SerialNumberField from '../fields/SerialNumber';
import Comment from '../fields/Comment';
import File from '../fields/File';

import Valid from './possibilities/Valid';
import NotValid from './possibilities/NotValid';
import Expired from './possibilities/Expired';
import ProductInfo from './possibilities/ProductInfo';

import Spinner from '../../../../public/src/components/elements/spinner/index';
import GSEButton from '../elements/GSEButton';

import { getLanguageResources } from '../../../../public/src/utils/language';

/**
 * For for one RMA item
 */
class RmaForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Status of the product (do is found or not)
             */
            serialNumberStatus: 'danger',
            /**
             * Product with that serial number is not found message
             */
            serialNumberNotFound: null,
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true,
            /**
             * Warranty status of the RMA item
             */
            rmaPossibility: null,
            /**
             * Information about the RMA Item product
             */
            product: null,
            /**
             * NOT REMEMBER, NOT USED HERE
             */
            isHaveWarranty: 0
        };

        this.checkSerialNumber = this.checkSerialNumber.bind(this);
        this.serialNumberSuccess = this.serialNumberSuccess.bind(this);
        this.serialNumberFailed = this.serialNumberFailed.bind(this);
        this.isAgreeExpiredCost = this.isAgreeExpiredCost.bind(this);
    }

    /**
     * Check do product with that serial number is correct
     * @param {String} number Serial number of the RMA item
     */
    checkSerialNumber (number) {
        // Check do is valid GSE serial number
        if (!number || isNaN(number) ||(number.length !== 4 && number.length !== 5 && number.length !== 10)) {
            this.setState({ serialNumberNotFound: getLanguageResources('errors').serialNumberNotFound });
            return this.serialNumberFailed();
        } else if (number.length === 4) { // Replace 4 digit with 10 digit serial number
            number = `000000${number}`;
            this.props.initialize({ serial_number: number, });
        }

        this.setState({ isFetchingData: false });
        let isCorrectNumber = this.props.setSerialNumber(number, this.props.index);

        // Check do the number is not exist on another form
        if (isCorrectNumber) {
            this.props.checkSerialNumber(number, this.serialNumberSuccess, this.serialNumberFailed);
        } else {
            this.setState({ serialNumberNotFound: getLanguageResources('errors').serialNumberIsUsed, isFetchingData: true });
            this.props.setMistake(true, this.props.index);
        }
    }

    /**
     * Product with that serial number is found.
     * Now need to realized what warranty status have that product
     * @param {Object} product
     */
    serialNumberSuccess (product) {
        if (product && product.id) {
            this.setState({ product });
            if (product.Active) { // is activated
                if (product.StopDate * 1000 > Date.now()) { // is valid
                    this.setState({
                        isFetchingData: true,
                        rmaPossibility: 'valid',
                        serialNumberStatus: 'success',
                        serialNumberNotFound: null
                    });
                    this.props.setMistake(false, this.props.index);
                } else { // is expired
                    this.setState({
                        isFetchingData: true,
                        rmaPossibility: 'expired',
                        serialNumberStatus: 'success',
                        serialNumberNotFound: null
                    });
                    // Set that form is not correct because first client need to agree to pay
                    this.props.setMistake(true, this.props.index);
                }
            } else { // is not active
                if ((Number(product.updated_at) + 63072000) * 1000 > Date.now()) { // valid
                    this.setState({
                        isFetchingData: true,
                        serialNumberStatus: 'success',
                        serialNumberNotFound: null,
                        rmaPossibility: 'not-valid'
                    });
                    this.props.setMistake(false, this.props.index);
                } else { // expired
                    this.setState({
                        isFetchingData: true,
                        serialNumberStatus: 'success',
                        serialNumberNotFound: null,
                        rmaPossibility: 'not-expired'
                    });
                    // Set that form is not correct because first client need to agree to pay
                    this.props.setMistake(true, this.props.index);
                }
            }
        } else { // Product not found
            this.setState({ isFetchingData: true, serialNumberNotFound: getLanguageResources('errors').serialNumberNotFound });
            this.serialNumberFailed();
        }
    }

    /**
     * Set status for RMA item for that product is not correct
     */
    serialNumberFailed () {
        this.setState({ isFetchingData: true, serialNumberStatus: 'danger' });
        this.props.setMistake(true, this.props.index);
    }

    /**
     * Change the status of the item for do agree to pay for repair
     * @param {Boolean} value Do user agree to pay 22 Euro for repair
     */
    isAgreeExpiredCost (value) {
        this.props.setMistake(!value, this.props.index);
    }

    render () {
        const { rmaRegistration, labels: { damage }, buttons: { upload, remove } } = getLanguageResources();
        let possibilities = null;
        let productInfo = null;

        // Set the View of the Rma Item depends of the warranty status
        if (this.state.rmaPossibility === 'valid') {
            possibilities = <Valid date={this.state.product.StopDate} title={rmaRegistration.second} />;
            productInfo = <ProductInfo product={this.state.product} />;
        } else if (this.state.rmaPossibility === 'expired') {
            possibilities = <Expired title={rmaRegistration.fifth} isAgreeCost={this.isAgreeExpiredCost} />;
            productInfo = <ProductInfo product={this.state.product} />;
        } else if (this.state.rmaPossibility === 'not-valid') { // valid but not active
            possibilities = <NotValid first={rmaRegistration.third} second={rmaRegistration.fourth} date={Number(this.state.product.updated_at)} />;
            productInfo = <ProductInfo product={this.state.product} />;
        } else if (this.state.rmaPossibility === 'not-expired') { // not active also is too old the product
            possibilities = <Expired title={rmaRegistration.fifth} isAgreeCost={this.isAgreeExpiredCost} />;
            productInfo = <ProductInfo product={this.state.product} />;
        }

        return (
            <Row>
                <Col>
                    <Form id={`rma-form-${this.props.index}`} onSubmit={e => { e.preventDefault(); }}>

                        {/* Show the Spinner while the data is fetching from server. */}
                        {!this.state.isFetchingData && <Spinner headTagId={`rma-form-${this.props.index}`} />}

                        <Row>
                            <Col lg={6}>
                                <Row>
                                    <Col>
                                <SerialNumberField
                                    col={12}
                                    errorMessage={this.state.serialNumberNotFound}
                                    checkSerialNumber={e => this.checkSerialNumber(e.target.value)}
                                    serialNumberStatus={this.state.serialNumberStatus} />
                                    </Col>
                                </Row>
                                <Row>
                                    {/* Show Warranty status */}
                                    <Col>
                                        <ReactCSSTransitionGroup transitionName='form-item'
                                                                 transitionEnterTimeout={500}
                                                                 transitionLeaveTimeout={500}
                                                                 transitionLeave={false}>
                                            {possibilities}
                                        </ReactCSSTransitionGroup>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg={6}>
                                <Col>
                                    <Field
                                        required
                                        type='text'
                                        id='damage'
                                        label={`${damage} *`}
                                        rows={2}
                                        name='damage'
                                        onBlur={(e) => this.props.setDamage(e.target.value, this.props.index)}
                                        maxCharacters={500}
                                        component={Comment} />
                                </Col>
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            {/* Show Product information */}
                            <Col lg={3}>
                                <Col>
                                    <ReactCSSTransitionGroup transitionName='form-item'
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={500}
                                        transitionLeave={false}>
                                        {productInfo}
                                    </ReactCSSTransitionGroup>
                                </Col>
                            </Col>

                            <Col lg={{ size: 3, offset: 3 }} xs={6}>
                                <File
                                    title={upload}
                                    setFile={this.props.setFile}
                                    maxFileSize={100}
                                    supportFormats={[ 'avi', 'jpg', 'png' ]}
                                    index={this.props.index} />
                            </Col>
                            <Col lg={3} xs={6}>
                                <GSEButton title={remove} type='normal' btnType={'button'}
                                           click={() => this.props.remove(this.props.index)} />
                            </Col>
                        </Row>

                        <br />
                    </Form>
                </Col>

                <hr />
                <br />
            </Row>
        );
    }
}

/**
 * Validate the form fields
 * @param {Object} values Serial number and damage fields
 */
function validate (values) {
    const errors = { };

    // Validate serial number field
    if (!values.serial_number) {
        errors.serial_number = 'Serial number is required';
    }

    // Valida damage field
    if (!values.damage) {
        errors.damage = 'Damage is required';
    }

    return errors;
}

RmaForm.propTypes = {
    /**
     * Set product for that RMA item form
     */
    setSerialNumber: PropTypes.func.isRequired,
    /**
     * Index of list of all forms on major form
     */
    index: PropTypes.number.isRequired,
    /**
     * Check the state of the product do is active or not
     * @param {Number} serialNumber The serial number of the product
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     * @param {String} recaptcha The google recaptcha response string
     */
    checkSerialNumber: PropTypes.func.isRequired,
    /**
     * Set/Remove the mistake from that form
     */
    setMistake: PropTypes.func.isRequired,
    /**
     * Set damage for that RMA item form
     */
    setDamage: PropTypes.func.isRequired,
    /**
     * Set file for that RMA item form
     */
    setFile: PropTypes.func.isRequired,
    /**
     * self-destruction that RMA item form
     */
    remove: PropTypes.func.isRequired,
    /**
     * The name of the rma item form
     */
    form: PropTypes.string.isRequired
};

export default reduxForm({
    validate,
    fields: [ 'serial_number' ]
})(RmaForm);

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { getLanguageResources } from '../../../../public/src/utils/language';

import Spinner from '../../../../public/src/components/elements/spinner/index';
import GSEButton from '../elements/GSEButton';

import RmaForm from './RmaForm';

import './rma-form.css';

/**
 * Component which is show when the client want to put items on the RMA form
 */
class CreateRMA extends React.Component {
    constructor (props) {
        super(props);

        this.formSubmit = this.formSubmit.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.setSerialNumber = this.setSerialNumber.bind(this);
        this.setDamage = this.setDamage.bind(this);
        this.setFile = this.setFile.bind(this);
        this.setMistake = this.setMistake.bind(this);

        this.prevKey = 0;

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: true,
            /**
             * All RMA items which is in the form
             */
            products: [
                { serialNumber: '', damage: '', file: null, mistakes: false }
            ],
            /**
             * All RMA items form
             */
            forms: [
                <RmaForm index={0}
                     key={0}
                     form='rmaForm-0'
                     checkSerialNumber={this.props.checkSerialNumber}
                     setSerialNumber={this.setSerialNumber}
                     setDamage={this.setDamage}
                     setFile={this.setFile}
                     setMistake={this.setMistake}
                     remove={() => this.removeProduct(0)} />
            ]
        };
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    /**
     * Send the request to the server for create the RMA
     */
    formSubmit () {
        this.setState({ isFetchingData: false });
        const products = this.state.products;

        if (products.length === 0) {
            return;
        }

        let data = new window.FormData();
        let isHaveItems = false;
        const { first, second } = getLanguageResources('mistakes');

        for (let i = 0, len = products.length; i < len; i++) {
            if (products[i] === null) {
                continue;
            }

            let { file, serialNumber, damage, mistakes } = products[i];

            if (mistakes || !damage) {
                window.alert(`${first} ${i + 1} ${second}`);
                this.setState({ isFetchingData: true });
                return;
            }

            if (!serialNumber) {
                continue;
            }

            if (file && file.name) {
                data.append(`file-${serialNumber}`, file, file.name);
            }

            data.append(`serialNumber-${serialNumber}`, serialNumber);
            data.append(`damage-${serialNumber}`, damage);
            isHaveItems = true;
        }

        if (isHaveItems) {
            this.props.createRma(data, (number) => this.props.history.push(`/rma/create/client/${number}`), () => this.setState({ isFetchingData: true }));
        } else {
            window.alert(`${first} 1 ${second}`);
            this.setState({ isFetchingData: true });
        }
    }

    /**
     * Add another product to the state
     */
    addNewProduct () {
        this.prevKey = this.prevKey + 1;
        this.setState({
            forms: [
                ...this.state.forms,
                <RmaForm index={this.prevKey}
                    key={this.prevKey}
                    form={`rmaForm-${this.prevKey}`}
                    checkSerialNumber={this.props.checkSerialNumber}
                    setSerialNumber={this.setSerialNumber}
                    setDamage={this.setDamage}
                    setFile={this.setFile}
                    setMistake={this.setMistake}
                    remove={this.removeProduct} />
            ],
            products: [
                ...this.state.products,
                { serialNumber: '', damage: '', file: null }
            ]
        });
    }

    /**
     * Remove product from state
     * @param {Number} index on the lists on state
     */
    removeProduct (index) {
        this.setState({
            forms: [
                ...this.state.forms.slice(0, index),
                ...this.state.forms.slice(index + 1)
            ],
            products: this.state.products.map((product, i) => {
                if (index === i) {
                    return null;
                }
                return product;
            })
        });
    }

    /**
     * Set serial number on rma form, but first check do already have that serial number
     * @param {String} serialNumber which client type
     * @param {Number} index on the lists on state
     * @returns {boolean} Do same item exist on state
     */
    setSerialNumber (serialNumber, index) {
        if (!serialNumber) return false;

        for (let i = 0, len = this.state.products.length; i < len; i++) {
            if (this.state.products[i] === null) {
                continue;
            }

            // Check do item with same serial number exist
            if (serialNumber === this.state.products[i].serialNumber && index !== i) {
                return false;
            }
        }

        this.setState({
            products: this.state.products.map((product, i) => {
                if (i === index) {
                    return {
                        ...product,
                        serialNumber
                    };
                } else {
                    return product;
                }
            })
        });

        return true;
    }

    /**
     * Set damage for the RMA form
     * @param {String} damage What damage the product have
     * @param {Number} index on the lists on state
     */
    setDamage (damage, index) {
        if (!damage) return;

        this.setState({
            products: this.state.products.map((product, i) => {
                if (i === index) {
                    return {
                        ...product,
                        damage
                    };
                } else {
                    return product;
                }
            })
        });
    }

    /**
     * Set file for the RMA form
     * @param {Array} files All files who client uploaded
     * @param {Number} index on the lists on state
     */
    setFile (files, index) {
        if (!files) return;

        this.setState({
            products: this.state.products.map((product, i) => {
                if (i === index) {
                    return {
                        ...product,
                        file: files[0]
                    };
                }
                return product;
            })
        });
    }

    /**
     * Set do client make mistake on RMA item form
     * @param {Boolean} mistakes Do have mistake or not
     * @param {Number} index on the lists on state
     */
    setMistake (mistakes, index) {
        this.setState({
            products: this.state.products.map((product, i) => {
                if (i === index) {
                    return {
                        ...product,
                        mistakes
                    };
                }
                return product;
            })
        });
    }

    render () {
        const { rmaRegistration: { header, first }, buttons: { add, next } } = getLanguageResources();

        return (
            <Col>
                <Row>
                    <Col className={'warranty-body'}>
                        <h4>{header}</h4>
                    </Col>
                </Row>

                <Row>
                    <Col className={'warranty-body'}>
                        <h5>{first}</h5>
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col id={'whole-rma-form'}>
                        {!this.state.isFetchingData && <Spinner headTagId='whole-rma-form' />}

                        {/* List all RMA Item forms */}
                        <ReactCSSTransitionGroup transitionName='form-item'
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={500}
                                                 transitionLeave={false}>
                            {this.state.forms}
                        </ReactCSSTransitionGroup>

                        <br />

                        {/* Add another RMA Item form */}
                        <Row>
                            <Col lg={{ size: 3, offset: 9 }} sm={{ size: 6, offset: 6 }}>
                                <GSEButton title={add} type='normal' btnType='button' click={this.addNewProduct} />
                            </Col>
                        </Row>

                        {/* Form submit button */}
                        <Row>
                            <Col lg={{ size: 3, offset: 9 }} sm={{ size: 6, offset: 6 }}>
                                <GSEButton title={next} type='normal' btnType='button' click={this.formSubmit} />
                            </Col>
                        </Row>

                        <br />
                    </Col>
                </Row>
            </Col>
        );
    }
}

CreateRMA.propTypes = {
    /**
     * Check the state of the product do is active or not
     * @param {Number} serialNumber The serial number of the product
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     * @param {String} recaptcha The google recaptcha response string
     */
    checkSerialNumber: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired,
    /**
     * Create the Rma document
     * @param {Number} number The id of the new created RMA
     * @param {Object} data Rma items which will add on the RMA document
     * @param {Function} success Action which will execute if request is success
     * @param {Function} failed Action which will execute if request is failed
     */
    createRma: PropTypes.func.isRequired
};

export default CreateRMA;

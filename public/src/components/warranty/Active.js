import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Alert } from 'reactstrap';

import { getLanguageResources } from '../../../../public/src/utils/language';

import GSEButton from '../elements/GSEButton';
import PageTitle from '../elements/PageTitle';
import WarrantyClientInfo from './WarrantyClientInfo';

import './warranty.css';

/**
 * Component which show information about the Product Warranty form
 */
class Active extends React.Component {
    componentDidMount () {
        if (!this.props.product.hasOwnProperty('StartDate')) {
            this.props.history.push('/activate');
        }
    }

    componentWillUnmount () {
        if (this.props.product.id) {
            this.props.clearWarrantyProduct();
        }

        this.props.resetError();
    }

    render () {
		console.log(this.props);
        if (this.props.product.hasOwnProperty('StartDate')) {
            const { warrantyExpired, buttons: { back }, titles: { productWarranty } } = getLanguageResources();

            return (
                <Col id='warranty-is-active-page'>
                    <PageTitle className={'warranty-is-active'} title={productWarranty} />

                    <br />

                    <Row>
                        <Col className='warranty-body' xs={12}>
                            {warrantyExpired.first} <strong>{this.props.product.SerialNumber}</strong>&nbsp;
                            {warrantyExpired.second} <strong>{new Date(this.props.product.StartDate * 1000).toLocaleDateString()}</strong> {warrantyExpired.third}&nbsp;
                            {warrantyExpired.fourth} <strong>{new Date(this.props.product.StopDate * 1000).toLocaleDateString()}</strong>&nbsp; <br />

                            {Date.now() / 1000 < this.props.product.StopDate && this.props.product.StopDate - this.props.product.StartDate < 94608000 && warrantyExpired.fifth}
                            &nbsp; {!this.props.account.hasOwnProperty('email') && warrantyExpired.sixth}
                        </Col>
                    </Row>

                    <WarrantyClientInfo clientName={this.props.product.ClientName} shopName={this.props.product.Shop} />

                    <br />

                    <Row>
                        <Col className='warranty-footer'>
                            <Col className='float-right' lg={3} md={5}>
                                <GSEButton title={back} type='normal' click={() => { this.props.history.goBack() } } />
                            </Col>
                        </Col>
                    </Row>

                    <br />
                </Col>
            );
        } else {
            return null;
        }
    }
}

Active.propTypes = {
    /**
     * Clear the product which was show before to the client. For cannot go back to that product
     * @returns {{type: string}} String for reducer
     */
    clearWarrantyProduct: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    resetError: PropTypes.func.isRequired,
    /**
     * Product warranty document
     */
    product: PropTypes.shape({
        id: PropTypes.number,
        StartDate: PropTypes.number,
        StopDate: PropTypes.number,
        SerialNumber: PropTypes.string,
        Active: PropTypes.number,
        created_at: PropTypes.number
    })
};

export default Active;

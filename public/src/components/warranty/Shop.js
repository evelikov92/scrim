import React, { Fragment } from 'react';
import { Row, Col, CardImg, Card, CardHeader, CardBody } from 'reactstrap';
import { getLanguageResources } from "../../../../public/src/utils/language";

import GSEButton from '../elements/GSEButton';
import WarrantyActivation from './WarrantyActivation';
import PageTitle from '../elements/PageTitle';

import './warranty.css';
import qrWarranty from './qr.png';


class Shop extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            page: Number(this.props.match.params.page) || 1,
            clientEmail: '',
            image: ''
        };

        this.renderFirstPage = this.renderFirstPage.bind(this);
        this.renderSecondPage = this.renderSecondPage.bind(this);
    }

    componentDidMount () {
        if (this.props.product) {
            this.props.clearWarrantyProduct();
        }
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    renderFirstPage () {
        let { shop, buttons: { next } } = getLanguageResources();
        return (
            <Fragment key={'first'}>
                <Card>
                    <CardHeader className={'warranty-body'}>{shop.second}</CardHeader>
                    <CardBody>
                        <ol>
                            <li className='warranty-body'>{shop.third}<br />{shop.fourth} <br /> {shop.fifth} <br /> {shop.sixth}</li>
                            <li className={'warranty-body'}>{shop.seventh}</li>
                            <li className={'warranty-body'}>
                                <Row>
                                    <Col className='warranty-body'>{shop.eight}</Col>
                                </Row>

                                <Row>
                                    <Col className='warranty-body' lg={4}>
                                        <CardImg bottom width='100%' src={qrWarranty} alt='QR Image' />
                                    </Col>
                                </Row>
                            </li>
                        </ol>
                    </CardBody>
                </Card>

                <br />

                <Row>
                    <Col md={{ size: 2, offset: 10 }} className='float-right'>
                        <GSEButton title={next} type='normal' btnType='button' click={() => this.props.history.push('/activate/shop/2') }/>
                    </Col>
                </Row>
            </Fragment>
        );
    }

    renderSecondPage () {
        return (
            <Fragment key={'second'}>
                <Row>
                    <WarrantyActivation
                        email={this.state.clientEmail}
                        serialNumber={this.state.serialNumber}
                        err={this.props.error}
                        checkSerialNumber={this.props.checkSerialNumber}
                        activateProduct={this.props.activateProduct}
                        success={() => this.props.history.push('/is-active')}
                        type='shop'
                        product={this.props.product} />
                </Row>
            </Fragment>
        );
    }

    render () {
        let { clientChoose: { clientShopBtn } } = getLanguageResources();

        const page = this.props.match.params.page;
        let pageContent = null;

        if (!page || page === '1') {
            pageContent = this.renderFirstPage();
        } else if (page === '2') {
            pageContent = this.renderSecondPage();
        }

        return (
            <Col xs={12} className='warranty-description shop-warranty-description'>
                <PageTitle title={clientShopBtn} />

                <br />

                {pageContent}

                <br />
            </Col>
        );
    }
}

export default Shop;

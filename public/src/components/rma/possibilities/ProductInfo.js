import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { SUB_DOMAIN } from "../../../../../public/src/utils/common";

/**
 * Show the product information
 */
const ProductInfo = (props) => {
    return (
        <Row>
            <Col className={'warranty-body'}>
                <Card>
                    <CardHeader className='text-center'>{props.product.Name}</CardHeader>
                    <CardBody className={'text-center'}>
                        <img className={'img-fluid'} src={`${SUB_DOMAIN}/build/images/category/${props.product.Groupitem}/${props.product.Name.replace(/[\/\\:*"<>|]/g, '')}.png`} />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
};

ProductInfo.propTypes = {
    /**
     * Information about the product
     */
    product: PropTypes.object.isRequired
};

export default ProductInfo;

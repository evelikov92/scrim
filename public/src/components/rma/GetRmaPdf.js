import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Input} from 'reactstrap';

import GSEButton from '../elements/GSEButton';

import { getLanguageResources } from '../../../../public/src/utils/language';
import Spinner from "../../../../public/src/components/elements/spinner";

/**
 * Show the information of the client what to do after register their RMA
 */
class GetRmaPdf extends React.Component {
    componentWillUnmount () {
        this.props.removeError();
    }

    render () {
        const { rmaRememberNumber, titles: { rmaRegistration }, common: { rmaFinish }  } = getLanguageResources();

        return (
            <Col id='warranty-is-active-page'>
                <Row className='warranty-is-active'>
                    <Col className='warranty-header' lg={{ size: 4, offset: 4 }}>
                        <GSEButton title={rmaRegistration} type='reverse' />
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col className={'text-center'} style={{ fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 'bold' }}>{rmaFinish}</Col>
                </Row>

                <br />

                <Row>
                    <Col id={'get-rma-number'}>
                        <Row>
                            <Col className='warranty-body text-center'>{rmaRememberNumber.yourRma}</Col>
                        </Row>

                        <br />

                        <Row>
                            <Col className='warranty-body'
                                 lg={{ size: 2, offset: 5 }} md={{ size: 4, offset: 4 }} sm={{ size: 6, offset: 3 }}>
                                <Input style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '3rem' }} type='text' value={this.props.match.params.number} disabled />
                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col
                                style={{ fontStyle: 'italic', fontWeight: 'bold' }}
                                className='warranty-body warranty-body-red text-center'>
                                {rmaRememberNumber.remember}
                            </Col>
                        </Row>

                        <br />
                    </Col>
                </Row>
            </Col>
        );
    }
}

GetRmaPdf.propTypes = {
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired
};

export default GetRmaPdf;

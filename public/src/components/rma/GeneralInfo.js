import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

import GSEInfo from '../elements/gse';
import GSEButton from '../elements/GSEButton';
import Spinner from '../../../../public/src/components/elements/spinner/index';

import SchemeItem from './schemeItem';

import '../warranty/warranty.css';

/**
 * Component for show the First page of steps to create RMA
 */
export const GeneralInfo = (props) => {
    const { rmaGeneralInfo, buttons: { getRmaNumber } } = getLanguageResources();

    return (
        <Col>
            <Row>
                <Col xs={12} className='warranty-body'>{rmaGeneralInfo.first}</Col>
            </Row>

            <br />

            <Row>
                <Col xs={12} className='warranty-body'>{rmaGeneralInfo.third}</Col>
            </Row>

            <br />

            <Row>
                <Col xs={12} className='warranty-body'>{rmaGeneralInfo.fourth}</Col>
            </Row>

            <br />

            <Row>
                <Col xs={12} className='warranty-body'>{rmaGeneralInfo.fifth}</Col>
            </Row>

            <br />

            {/* GSE location information with Box on right side */}
            <GSEInfo
                btnTitle={getRmaNumber}
                click={() => { props.history.push('/rma/create/info'); }} />

            <br />

            <Row>
                <Col xs={12} className='warranty-body'>{rmaGeneralInfo.seventh}</Col>
            </Row>

            <br />

            <Row>
                <Col xs={12} className='warranty-body warranty-body-red'>{rmaGeneralInfo.eight}</Col>
            </Row>
        </Col>
    );
};

/**
 * Component where client create the RMA and is show the number
 */
export class CreateRmaNumber extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: false
        }
    }

    render () {
        const { rmaRememberNumber, buttons: { next } } = getLanguageResources();

        let number = null;
        if (this.props.number) {
            // Big Box with big font for can show the RMA Number
            number = [
                <br key={'above'} />,
                <Row key={'row'}>
                    <Col className='warranty-body'
                         lg={{ size: 2, offset: 5 }} md={{ size: 4, offset: 4 }} sm={{ size: 6, offset: 3 }}>
                        <Input style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '3rem' }} type='text' value={this.props.number} disabled />
                    </Col>
                </Row>,
                <br key={'below'} />
            ];
        }

        return (
            <Col id={'get-rma-number'}>
                <Row>
                    <Col className='warranty-body text-center'>{rmaRememberNumber.yourRma}</Col>
                </Row>

                {/* Show the Spinner while the data is fetching from server. */}
                {!this.state.isFetchingData && <Spinner headTagId='get-rma-number' />}

                {number}

                <Row>
                    <Col
                        style={{ fontStyle: 'italic', fontWeight: 'bold' }}
                        className='warranty-body warranty-body-red text-center'>
                        {rmaRememberNumber.remember}
                    </Col>
                </Row>

                <br />

                <Row>
                    <Col md={{ size: 2, offset: 5 }}>
                        <GSEButton title={next}
                                   type='normal' btnType='button' className='float-right'
                                   click={() => { this.props.history.push(`/rma/create/info/${this.props.number}`); }} />
                    </Col>
                </Row>
            </Col>
        )
    }
}

/**
 * Component which explain what to do with the defect products.
 */
export const SchemeInfo = (props) => {
    const { rmaSchemeInfo, buttons: { readWarrantyTerms, next } } = getLanguageResources();

    return (
        <Col>
            <Row>
                <Col xs={12}>{rmaSchemeInfo.first}</Col>
                <Col xs={12}>{rmaSchemeInfo.second}</Col>
                <Col xs={12}>{rmaSchemeInfo.third}</Col>
            </Row>

            <br />

            <Row>
                <SchemeItem left={rmaSchemeInfo.fourth} right={rmaSchemeInfo.eight} />
            </Row>

            <Row>
                <SchemeItem left={rmaSchemeInfo.fifth} right={rmaSchemeInfo.eight} />
            </Row>

            <Row>
                <SchemeItem left={rmaSchemeInfo.sixth} right={rmaSchemeInfo.ninth} />
            </Row>

            <Row>
                <SchemeItem left={rmaSchemeInfo.seventh} right={rmaSchemeInfo.ninth} />
            </Row>

            <br />

            <Row>
                <Col lg={{ size: 3, offset: 3 }} md={{ size: 4, offset: 2 }} sm={{ size: 5, offset: 2 }} xs={12} style={{ marginTop: '.5%' }}>
                    <GSEButton title={readWarrantyTerms}
                               type='normal' btnType='button' className='float-left'
                               click={() => { props.history.push('/rma/terms'); }} />
                </Col>

                <br />

                <Col md={{ size: 3, offset: 3 }} sm={{ size: 4, offset: 1 }} xs={12} style={{ marginTop: '.5%' }}>
                    <GSEButton title={next}
                               type='normal' btnType='button' className='float-right'
                               click={() => { props.history.push('/rma/create/generate'); }} />
                </Col>
            </Row>

            <br />
        </Col>
    );
};

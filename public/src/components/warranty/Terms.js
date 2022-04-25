import React from 'react';
import { getLanguageResources } from '../../../../public/src/utils/language';
import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import GSEButton from '../elements/GSEButton';

import './warranty.css';

const Terms = (props) => {
    const{ warrantyTerms, buttons: { back } } = getLanguageResources();

    return (
        <Col className='warranty-terms'>
            {_.map(warrantyTerms, (term, i) => {
                return [
                    <Row key={term}>
                        <Col className={'warranty-body'}>{term}</Col>
                    </Row>,
                    <br key={i} />
                ];
            })}

            <br />

            <Row>
                <Col sm={{ size: 4, offset: 8 }} md={{ size: 3, offset: 9 }} lg={{ size: 2, offset: 10 }}>
                    <GSEButton type={'normal'} title={back} click={() => props.history.goBack()} />
                </Col>
            </Row>

            <br />
        </Col>
    )
};

export default Terms;

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { getLanguageResources } from '../../../../../public/src/utils/language';

import GSEButton from '../GSEButton';
import box from './box.png';

/**
 * Show the information about G-Systems OldEngineering Something like visit card.
 * @param {Object} props btnTitle and click properties
 */
const GSEInfo = (props) => {
    const { telephone, postalAddress } = getLanguageResources('labels');

    return (
            <Row>
                <Col className={'warranty-body'}>
                    <Row>
                        <Col lg={8}>
                            <GSEButton type='normal' btnType='button' title={props.btnTitle} click={props.click} />
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col md={5} className='text-center-md-down'>
                            <strong>{postalAddress}:</strong> <br />
                            G-Systems OldEngineering OOD <br />
                            Industrial zone 11 <br />
                            8800, Sliven, Bulgaria <br />
                            {telephone}: +359 44 675 357
                        </Col>

                        <Col sm={{ size: 6, offset: 1 }} className='text-center-md-down'>
                            <img src={box} alt='box' className='img-fluid' />
                        </Col>
                    </Row>
                </Col>

            </Row>
    );
};

GSEInfo.propTypes = {
    /**
     * The text on the button
     */
    btnTitle: PropTypes.string.isRequired,
    /**
     * Function for execute of the button when is clicked
     */
    click: PropTypes.func
};

export default GSEInfo;

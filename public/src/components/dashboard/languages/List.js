import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import bg from './bg.png';
import de from './de.jpeg';
import en from './en.png';
import es from './es.png';
import fr from './fr.jpg';
import it from './it.png';

const ListOfLanguages = (props) => {
    const url = props.location.pathname + '/open/';

    return (
        <Col>
            <Row>
                <Col xs={3} className={'text-center'}>
                    <Link to={`${url}en`}>
                        <img src={en} className={'img-fluid img-thumbnail'} alt={'English'} title={'English'} width={200} />
                    </Link>
                </Col>
                <Col xs={{ size: 3, offset: 1 }} className={'text-center'}>
                    <Link to={`${url}de`}>
                        <img src={de} className={'img-fluid img-thumbnail'} alt={'Deutsch'} title={'Deutsch'} width={200} />
                    </Link>
                </Col>
                <Col xs={{ size: 3, offset: 1 }} className={'text-center'}>
                    <Link to={`${url}fr`}>
                        <img src={fr} className={'img-fluid img-thumbnail'} alt={'France'} title={'France'} width={200} />
                    </Link>
                </Col>
            </Row>

            <br />

            <Row>
                <Col xs={3} className={'text-center'}>
                    <Link to={`${url}es`}>
                        <img src={es} className={'img-fluid img-thumbnail'} alt={'Espanol'} title={'Espanol'} width={200} />
                    </Link>
                </Col>
                <Col xs={{ size: 3, offset: 1 }} className={'text-center'}>
                    <Link to={`${url}it`}>
                        <img src={it} className={'img-fluid img-thumbnail'} alt={'Italiano'} title={'Italiano'} width={200} />
                    </Link>
                </Col>
                <Col xs={{ size: 3, offset: 1 }} className={'text-center'}>
                    <Link to={`${url}bg`}>
                        <img src={bg} className={'img-fluid img-thumbnail'} alt={'Български'} title={'Български'} width={200} />
                    </Link>
                </Col>
            </Row>
        </Col>
    );
};

export default ListOfLanguages;

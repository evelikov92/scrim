import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const Slide = (props) => {
    return (
        <li className={`${props.className} used-default-slide`}>
            <Row>
                <Col style={props.animationTitle} className='slide-show-title'>
                    Title {props.title}
                </Col>
            </Row>

            <Row>
                <Col style={props.animationMessage} className='slide-show-message'>
                    Message {props.message}
                </Col>
            </Row>

            <img className='slide-show-image img-fluid w-100'
                 onLoad={props.onImageLoad}
                 onError={props.onImageError}
                 style={props.animationImage}
                 src={props.image}
                 alt='slide-show' />
        </li>
    );
};

Slide.defaultProps = {
    className: ''
};

Slide.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    animationTitle: PropTypes.object.isRequired,
    animationImage: PropTypes.object.isRequired,
    animationMessage: PropTypes.object.isRequired,
    onImageLoad: PropTypes.func.isRequired,
    onImageError: PropTypes.func
};

export default Slide;

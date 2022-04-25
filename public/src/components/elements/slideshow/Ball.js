import React from 'react';
import PropTypes from 'prop-types';

const Ball = ({ className, item }) => {
    return (
        <li className={className}>Ball {item}</li>
    );
};

Ball.propTypes = {
    className: PropTypes.string,
    item: PropTypes.number
};

export default Ball;
import React from 'react';
import PropTypes from 'prop-types';

import './ball.css';

/**
 * Show the ball with color inside another ball
 * @param color The color of the ball (success, danger)
 */
const GSEBall = ({ color }) => {
    return (
        <div className={`gse-ball ${color}`}><div /></div>
    )
};

GSEBall.propTypes = {
    /**
     * Color of the ball danger/success red/green
     */
    color: PropTypes.oneOf([ 'danger', 'success' ]).isRequired
};

export default GSEBall;

import React from 'react';
import PropTypes from 'prop-types';

import './spinner.css';

/**
 * Show Loading spinner in the center on the html tag
 */
class Spinner extends React.Component {
    componentDidMount () {
        this.element = document.getElementById(this.props.headTagId);
        this.elementClasses = this.element.className;

        this.element.className += ' unrecognized';
    }

    componentWillUnmount () {
        this.element.className = this.elementClasses
    }

    render () {
        return (
            <div className='spinner'>
                <div className='spinner-shape' />
                <div className='spinner-text'>Loading...</div>
            </div>
        );
    }
}

Spinner.propTypes = {
    /**
     * The id tag of the html tag
     */
    headTagId: PropTypes.string.isRequired
};

export default Spinner

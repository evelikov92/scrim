import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

import './error.css';

/**
 * Show the Global error on the page
 * @param {String} error The text of the error
 */
const GlobalError = ({ error }) => {
    return (
        <Alert color='danger' className='text-center'>
            <strong className='alert-link'>Oops!</strong> &nbsp; {error}
        </Alert>
    );
};

GlobalError.propTypes = {
    /**
     * Error text
     */
    error: PropTypes.string.isRequired
};

export default GlobalError;

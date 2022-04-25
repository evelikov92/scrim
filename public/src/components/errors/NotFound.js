import React from 'react';

/**
 * Component which need to show if the page is not found
 */
class NotFound extends React.Component {
    componentDidMount () {
        // Go to the home page after 3 seconds
        this.timeOut = setTimeout(() => {
            this.props.history.push('/');
        }, 3000);
    }

    componentWillUnmount () {
        clearTimeout(this.timeOut);
    }

    render () {
        return (
            <div>
                <h1 className='text-center'>404 PAGE NOT FOUND</h1>
            </div>
        );
    }
}

export default NotFound;

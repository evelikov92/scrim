import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

import SlideShow from '../elements/slideshow';

class Home extends React.Component {

    componentDidMount () {
        if (this.props.account.hasOwnProperty('group')) {
            if (this.props.account.group === '1' || this.props.account.group === '2') {
                this.props.history.push('/dashboard/rma');
            } else if (this.props.account.group === '3') {
                this.props.history.push('/statistic');
            } else if (this.props.account.group === '4') {
                this.props.history.push('/translate');
            }
        } else {
            this.props.history.push('/activate');
        }
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    render () {
        return (
            <div id='home-page'>
                <Col lg={12}>
                    {this.props.sliders && this.props.sliders.length && <SlideShow sliders={this.props.sliders} />}
                </Col>
            </div>
        );
    }
}

Home.propTypes = {
    sliders: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string,
        link: PropTypes.string,
        title: PropTypes.string,
        message: PropTypes.string
    })),
    removeError: PropTypes.func.isRequired,
    getSliderProducts: PropTypes.func.isRequired
};

export default Home;

import React from 'react';
import PropTypes from 'prop-types';

import Ball from './Ball';
import DefaultSlide from './Slide';

import Spinner from '../../../../../public/src/components/elements/spinner';

import './slideshow.css';

class SlideShow extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeSlide: 0,
            opacityImage: 100,
            opacityTitle: 100,
            opacityMessage: 100,
            imageLoadStatus: 'pending'
        };

        this.sleep = this.sleep.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.nextSlide = this.nextSlide.bind(this);

        this.fadeIn = this.fadeIn.bind(this);
        this.fadeOut = this.fadeOut.bind(this);

        this.animation = this.animation.bind(this);
        this.animateNextSlide = this.animateNextSlide.bind(this);

        this.handleImageError = this.handleImageError.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    handleImageLoaded () {
        this.setState({ imageLoadStatus: 'loaded' });
        this.animation();
    }

    handleImageError () {
        this.setState({ imageLoadStatus: 'failed' });
    }

    componentWillUnmount () {
        this.interval && clearInterval(this.interval);
        this.interval = false;
    }

    animation () {
        this.interval = setInterval(async () => {
            await this.animateNextSlide();
        }, this.props.timeout);
    }

    async animateNextSlide () {
        await this.fadeOut();

        if (this.state.activeSlide === this.props.sliders.length - 1) {
            this.setState({ activeSlide: 0 });
        } else {
            this.setState({ activeSlide: this.state.activeSlide + 1 });
        }

        await this.fadeIn();
    }

    async fadeOut () {
        if (this.props.sliders.length && this.props.sliders[0].hasOwnProperty('message')) {
            for (let i = 0; i <= 100; i++) {
                this.setState({ opacityMessage: this.state.opacityMessage - 1 });
                await this.sleep(this.props.animation.time / (100 * 2 * 3));
            }
            await this.sleep(50);
        }

        if (this.props.sliders.length && this.props.sliders[0].hasOwnProperty('title')) {
            for (let i = 0; i <= 100; i++) {
                this.setState({ opacityTitle: this.state.opacityTitle - 1 });
                await this.sleep(this.props.animation.time / (100 * 2 * 3));
            }
            await this.sleep(50);
        }

        for (let i = 0; i <= 100; i++) {
            this.setState({ opacityImage: this.state.opacityImage - 1 });
            await this.sleep(this.props.animation.time / (100 * 2 * 3));
        }
    }

    async fadeIn () {
        for (let i = 0; i <= 100; i++) {
            this.setState({ opacityImage: this.state.opacityImage + 1 });
            await this.sleep(this.props.animation.time / (100 * 2 * 3));
        }
        await this.sleep(50);

        if (this.props.sliders.length && this.props.sliders[0].hasOwnProperty('title')) {
            for (let i = 0; i <= 100; i++) {
                this.setState({ opacityTitle: this.state.opacityTitle + 1 });
                await this.sleep(this.props.animation.time / (100 * 2 * 3));
            }
            await this.sleep(50);
        }

        if (this.props.sliders.length && this.props.sliders[0].hasOwnProperty('message')) {
            for (let i = 0; i <= 100; i++) {
                this.setState({ opacityMessage: this.state.opacityMessage + 1 });
                await this.sleep(this.props.animation.time / (100 * 2 * 3));
            }
        }
    }

    sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async prevSlide () {
        clearInterval(this.interval);

        await this.fadeOut();
        if (this.state.activeSlide === 0) {
            this.setState({ activeSlide: this.props.sliders.length - 1 });
        } else {
            this.setState({ activeSlide: this.state.activeSlide - 1 });
        }
        await this.fadeIn();

        this.animation();
    }

    async nextSlide () {
        clearInterval(this.interval);

        await this.animateNextSlide();

        this.animation();
    }

    render () {
        const balls = [];
        const contents = [];

        for (let i = 0, len = this.props.sliders.length; i < len; i++) {
            let isActiveItem = i === this.state.activeSlide;

            const contentClass = isActiveItem ? 'active-slide slide' : 'slide';
            const ballClass = isActiveItem ? 'active-ball ball' : 'ball';

            contents.push(
                <this.props.component
                    className={contentClass}
                    {...this.props.sliders[i]}
                    onImageLoad={() => this.handleImageLoaded()}
                    onImageError={() => this.handleImageError()}
                    animationTitle={{ opacity: this.state.opacityTitle / 100 }}
                    animationMessage={{ opacity: this.state.opacityMessage / 100 }}
                    animationImage={{ opacity: this.state.opacityImage / 100 }}
                    key={i} />
            );
            balls.push(<Ball item={i} key={i} className={ballClass} />);
        }

        return (
            <div className='react-slide-show' id='react-slider'>

                {this.state.imageLoadStatus === 'pending' && <Spinner headTagId='react-slider' />}

                <i className='slide-arrow left-slide-arrow float-left fa fa-arrow-circle-left fa-2x' onClick={() => this.prevSlide()} />
                <ul className='slide-show-content'>
                    {contents}
                </ul>
                <i className='slide-arrow right-slide-arrow float-right fa fa-arrow-circle-right fa-2x' onClick={() => this.nextSlide()} />
                <ul className='slide-show-ball'>
                    {balls}
                </ul>
            </div>
        )
    }
}

SlideShow.defaultProps = {
    animation: { time: 1000, type: 'fade' },
    timeout: 15000,
    component: DefaultSlide
};

SlideShow.propTypes = {
    sliders: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        link: PropTypes.string,
        title: PropTypes.string,
        message: PropTypes.string
    })),
    timeout: PropTypes.number,
    animation: PropTypes.shape({
        type: PropTypes.oneOf([ 'fade' ]),
        time: PropTypes.number
    }),
    component: PropTypes.func
};

export default SlideShow;

import React from 'react';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './cookie-law.css';

class CookieLawBanner extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            fixedClass: ''
        };

        this.agree = this.agree.bind(this);
        this.scroll = this.scroll.bind(this);
    }

    componentDidMount () {
        this.element = document.getElementById('g-systems-OldEngineering');
        this.element.className += ' cookie-unrecognized';
        window.addEventListener('scroll', this.scroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.scroll);
    }

    agree () {
        this.element.classList.remove('cookie-unrecognized');
        window.localStorage.setItem('cookie-law', 'agree');
        this.props.agree();
    }

    scroll () {
        const banner = this.refs.cookieBanner;
        let bannerOffset = banner.offsetTop;
        let scrollPos = document.documentElement.scrollTop || this.element.scrollTop;
        if (scrollPos >= bannerOffset) {
            // add class cookie-banner-fixed
            this.setState({ fixedClass: ' cookie-banner-fixed' });
        } else {
            // remove class fixed
            this.setState({ fixedClass: '' });
        }
    }

    render () {
        return (
            <div className={`cookie-banner row${this.state.fixedClass}`} ref={'cookieBanner'}>
                <Col className={'text-center'}>
                    We use cookies on this site to enhance your user experience.
                    &nbsp;

                    <Button
                        onClick={this.agree}
                        color={'success'}>
                        Agree
                    </Button>

                    &nbsp;

                    <Button
                        onClick={() => { window.location.href = 'http://www.g-systems.eu'; }}
                        color={'danger'}>
                        Disagree
                    </Button>

                    &nbsp;

                    <Link
                        target={'_blank'}
                        className={'btn btn-info btn-href'}
                        to={'/cookie/law/description'}>
                        More Information
                    </Link>
                </Col>
            </div>
        );
    }
}

export default CookieLawBanner;

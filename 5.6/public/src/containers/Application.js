import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, } from 'reactstrap';

import Spinner from '../components/elements/spinner';

import { setLanguage, getLanguage, getResources } from '../actions/language';
import { getLoggedUser } from '../actions/account';

import './app.css';

import Registration from './account/Registration';
import Logout from './account/Logout';

class Application extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingUser: false,
            isFetchingText: false,
            isFetchingData: false,
            isFetchingLanguage: false
        };

        this.isLogged = this.isLogged.bind(this);

        this.getUser = this.getUser.bind(this);
        this.getText = this.getText.bind(this);
        this.getLanguage = this.getLanguage.bind(this);

        this.count = 0;
    }

    componentDidMount () {
        this.props.getLanguage(this.getLanguage);
        this.props.getResources(this.getText);
        this.props.getLoggedUser(this.getUser);

        // // Set the cookie status
        // let cookieLaw = window.localStorage.getItem('cookie-law');
        // if (cookieLaw !== 'agree') {
        //     window.setTimeout(() => {
        //         if (window.location.pathname !== `/cookie/law/description`) {
        //             this.setState({ cookieBannerAgree: false });
        //         }
        //     }, 200);
        // }
    }

    getUser () {
        if (this.state.isFetchingText && this.state.isFetchingLanguage && !this.state.isFetchingData) {
            this.setState({ isFetchingData: true, isFetchingUser: true });
        } else {
            this.setState({ isFetchingUser: true });
        }
    }

    getLanguage () {
        if (this.state.isFetchingText && this.state.isFetchingUser && !this.state.isFetchingData) {
            this.setState({ isFetchingData: true, isFetchingLanguage: true });
        } else {
            this.setState({ isFetchingLanguage: true });
        }
    }

    getText () {
        if (this.state.isFetchingUser && this.state.isFetchingLanguage && !this.state.isFetchingData) {
            this.setState({ isFetchingData: true, isFetchingText: true });
        } else {
            this.setState({ isFetchingText: true });
        }
    }

    isLogged () {
        return this.props.account.hasOwnProperty('email');
    }

    setLanguage (lang, callback) {
        this.setState({ isFetchingData: false });
        this.props.setLanguage(lang, () => {
            callback();
            this.setState({ isFetchingData: true });
        });
    }

    render () {
        return (
            <BrowserRouter basename={`/`}>
                <div id={'scrim'}>
                    <div id={'scrim-app'}>

                    {!this.state.isFetchingData && <Spinner headTagId={'scrim'} />}

                    {this.state.isFetchingData && <Fragment>
                        {/*<Header isAuthenticated={this.isLogged()} account={this.props.account} setLanguage={(lang, callback) => this.setLanguage(lang, callback)} />*/}

                        {/*{this.props.error.data && this.props.error.data.message && <GlobalError error={this.props.error.data.message} />}*/}

                        <br />

                        <Container className={'scrim-container'} fluid>
                            <Routes>
                                <Route path={'/account/registration'} element={<Registration />} />
                                <Route path={'/account/logout'} element={<Logout />} />
                            </Routes>

                            {/*<Route exact path='/' component={Home} />*/}
                            {/*<Route path={'/cookie/law/description'} component={CookieLaw} />*/}

                            {/*<Route path={'/account/login'} component={Login} />*/}
                            {/*<Route path='/account/logout' component={Logout} />*/}
                            {/*<Route path='/account/set-password/:token' component={SetPassword} />*/}
                            {/*<Route path='/account/forgot-password' component={ForgotPassword} />*/}
                            {/*<Route path='/account/confirmation' component={ConfirmationEmail} />*/}
                            {/*<Route path='/account/activate/:token' component={ActivateAccount} />*/}

                            {/*<Route component={NotFound} />*/}
                        </Container>
                    </Fragment>}

                    <br />

                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

Application.propTypes = {
    account: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    account: state.account,
    error: state.error,
    lang: state.language,
    token: state.token
});

export default connect(
    mapStateToProps,
    {
        setLanguage,
        getLanguage,
        getLoggedUser,
        getResources
    }
)(Application);

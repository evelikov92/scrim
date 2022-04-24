import { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions/account'
import PropTypes from 'prop-types'

class Logout extends Component {
    componentDidMount () {
        this.props.logout();
    }

    render () {
        return null
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, props) => ({
    logout: () => {
        dispatch(logout());
        props.history.push('/account/login');
    }
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);

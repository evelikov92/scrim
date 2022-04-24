import { connect } from 'react-redux';
import removeError from '../../actions/error';
import { checkEmail, checkUsername, registration } from '../../actions/account';

import Registration from '../../components/account/Registration';

const mapStateToProps = state => ({
    countries: state.countries,
    err: state.error
});

export default connect(
    mapStateToProps,
    {
        removeError,
        checkUsername,
        checkEmail,
        registration
    }
)(Registration);

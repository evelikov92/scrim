import { connect } from 'react-redux';
import Registration from '../../../components/dashboard/users/Registration';
import removeError from '../../../../../public/src/actions/error';
import { registration, checkUsername, checkEmail } from "../../../../../public/src/actions/account";

const mapStateToProps = state => ({
    err: state.error
});

export default connect(
    mapStateToProps,
    {
        removeError,
        registration,
        checkUsername,
        checkEmail
    }
)(Registration);

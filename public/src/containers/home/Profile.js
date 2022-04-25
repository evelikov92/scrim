import { connect } from 'react-redux';
import removeError from '../../../../public/src/actions/error';
import Profile from '../../components/home/Profile';
import { getAccount, editAccount } from '../../actions/wholesale';
import { checkEmail, checkUsername } from "../../../../public/src/actions/account";

const mapStateToProps = (state) => ({
    profile: state.account,
    err: state.error
});

export default connect(
    mapStateToProps,
    {
        removeError,
        getAccount,
        editAccount,
        checkEmail,
        checkUsername
    }
)(Profile);

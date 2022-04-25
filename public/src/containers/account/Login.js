import { connect } from 'react-redux';
import { login } from "../../../../public/src/actions/account";
import removeError from '../../../../public/src/actions/error';
import Login from '../../components/account/Login';

export default connect(
    null,
    { login, removeError }
)(Login);

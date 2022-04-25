import { connect } from 'react-redux';
import removeError from '../../../../public/src/actions/error';
import { askForNewPassword } from "../../../../public/src/actions/account";

import ForgotPassword from '../../components/account/ForgotPassword';

export default connect(
    null,
    {
        removeError,
        askForNewPassword
    }
)(ForgotPassword);

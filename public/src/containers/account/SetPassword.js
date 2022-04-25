import { connect } from 'react-redux';
import removeError from '../../../../public/src/actions/error';
import { setNewPassword } from "../../../../public/src/actions/account";

import SetPassword from '../../components/account/SetPassword';

export default connect(
    null,
    {
        removeError,
        setNewPassword
    }
)(SetPassword);
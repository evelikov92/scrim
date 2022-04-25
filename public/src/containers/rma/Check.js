import { connect } from 'react-redux';
import removeError from '../../../../public/src/actions/error';
import { getRmaStatus, clearRmaStatus } from "../../actions/rma";
import Check from '../../components/rma/Check';

const mapStateToProps = (state) => ({
    err: state.error,
    status: state.rmaStatus,
    account: state.account
});

export default connect(
    mapStateToProps,
    {
        removeError,
        getRmaStatus,
        clearRmaStatus
    }
)(Check);

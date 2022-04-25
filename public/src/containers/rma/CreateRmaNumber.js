import { connect } from 'react-redux';
import removeError from '../../../../public/src/actions/error';
import { createRmaNumber, clearRmaStatus } from "../../actions/rma";
import { CreateRmaNumber } from '../../components/rma/GeneralInfo';

const mapStateToProps = (state) => ({
    number: state.rmaStatus.id
});

export default connect(
    mapStateToProps,
    {
        createRmaNumber,
        removeError,
        clearRmaStatus
    }
)(CreateRmaNumber);

import { connect } from 'react-redux';
import removeError from '../../../../public/src/actions/error';
import { checkSerialNumber } from "../../actions/warranty";
import { createRma } from "../../actions/rma";
import CreateRMA from '../../components/rma/CreateRMA';


const mapStateToProps = (state) => ({
    product: state.warranty,
    error: state.error
});

export default connect(
    mapStateToProps,
    {
        removeError,
        checkSerialNumber,
        createRma
    }
)(CreateRMA);

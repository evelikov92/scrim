import { connect } from 'react-redux';
import resetError from '../../../../public/src/actions/error';
import { checkSerialNumber, deactivateWarranty, clearWarrantyProduct } from '../../actions/warranty';
import Deactivate from '../../components/warranty/Deactivate';

const mapStateToProps = (state) => ({
    product: state.warranty,
    err: state.error
});

export default connect(
    mapStateToProps,
    {
        resetError,
        checkSerialNumber,
        deactivateWarranty,
        clearWarrantyProduct
    }
)(Deactivate);

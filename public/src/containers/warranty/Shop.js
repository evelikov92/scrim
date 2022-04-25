import { connect } from 'react-redux';
import resetError from '../../../../public/src/actions/error';
import { activateProduct, checkSerialNumber, clearWarrantyProduct } from "../../actions/warranty";
import Shop from '../../components/warranty/Shop';

const mapStateToProps = (state) => ({
    error: state.error,
    product: state.warranty
});

export default connect(
    mapStateToProps,
    {
        activateProduct,
        checkSerialNumber,
        clearWarrantyProduct,
        resetError
    }
)(Shop);

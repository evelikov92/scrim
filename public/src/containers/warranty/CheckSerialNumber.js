import { connect } from 'react-redux';
import resetError from '../../../../public/src/actions/error';
import { clearWarrantyProduct, checkSerialNumber } from "../../actions/warranty";
import CheckSerialNumber from '../../components/warranty/CheckSerialNumber';

const mapStateToProps = (state) => ({
    err: state.error,
    product: state.warranty,
    account: state.account
});

export default connect(
    mapStateToProps,
    {
        resetError,
        clearWarrantyProduct,
        checkSerialNumber
    }
)(CheckSerialNumber);

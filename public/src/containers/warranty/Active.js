import { connect } from 'react-redux';
import { clearWarrantyProduct } from "../../actions/warranty";
import Active from '../../components/warranty/Active';
import resetError from '../../../../public/src/actions/error';

const mapStateToProps = state => ({
    product: state.warranty,
    account: state.account,
});

export default connect(
    mapStateToProps,
    {
        clearWarrantyProduct,
        resetError
    }
)(Active);

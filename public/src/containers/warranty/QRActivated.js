import { connect } from 'react-redux';
import resetError from '../../../../public/src/actions/error';
import { qrActivation, qrPrivateActivation, qrShopActivation, qrGetProduct } from "../../actions/warranty";
import QRActivated from '../../components/warranty/QRActivated';

const mapStateToProps = (state) => ({
    account: state.account,
    product: state.warranty
});

export default connect(
    mapStateToProps,
    {
        qrActivation,
        qrPrivateActivation,
        qrShopActivation,
        qrGetProduct,
        resetError
    }
)(QRActivated);

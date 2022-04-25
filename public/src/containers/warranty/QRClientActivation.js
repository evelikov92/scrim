import { connect } from 'react-redux';
import { qrThreeYearActivation } from "../../actions/warranty";
import resetError from '../../../../public/src/actions/error';
import QRClientActivation from '../../components/warranty/QRClientActivation';

export default connect(
    null,
    {
        qrThreeYearActivation,
        resetError
    }
)(QRClientActivation);

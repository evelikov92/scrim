import { connect } from 'react-redux';
import {
    clearWholesalerLocation,
    getWholesalerPosition,
    getActiveWholesaler,
    editWholesalerAccount
} from '../../../actions/dashboard/wholesaler';
import removeError from '../../../../../public/src/actions/error';
import WholesalerOpen from '../../../components/dashboard/wholesaler/Open';

const mapStateToProps = (state) => ({
    place: state.place,
    wholesaler: state.wholesalers.item
});

export default connect(
    mapStateToProps,
    {
        clearWholesalerLocation,
        getWholesalerPosition,
        getActiveWholesaler,
        editWholesalerAccount,
        removeError
    }
)(WholesalerOpen);

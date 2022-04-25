import { connect } from 'react-redux';
import resetError from '../../../../../public/src/actions/error';
import { getActiveRMA, updateRmaItemStatus } from "../../../actions/dashboard/rma";

import RMAItem from '../../../components/dashboard/rma/RMAItem';

const mapStateToProps = (state) => ({
    rma: state.rma.active,
    items: state.rmaItems,
});

export default connect(
    mapStateToProps,
    {
        getActiveRMA,
        updateRmaItemStatus,
        resetError
    }
)(RMAItem);

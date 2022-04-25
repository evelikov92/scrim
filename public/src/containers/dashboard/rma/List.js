import { connect } from 'react-redux';
import List from '../../../components/dashboard/rma/List';
import removeError from '../../../../../public/src/actions/error';
import setItemsPerPage from '../../../actions/dashboard/common';
import { getAllRMAItems, search, getRmaBySerialNumber, getRmaByCategory } from "../../../actions/dashboard/rma";

const mapStateToProps = (state) => ({
    rmaList: state.rma.list.items,
    status: state.rma.list.status,
    count: state.rma.list.count,
    items: state.common
});

export default connect(
    mapStateToProps,
    {
        removeError,
        setItemsPerPage,
        getAllRMAItems,
        getRmaBySerialNumber,
        getRmaByCategory,
        search
    }
)(List);

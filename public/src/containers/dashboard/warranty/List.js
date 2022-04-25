import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import List from '../../../components/dashboard/warranty/List';
import { getAll, search } from '../../../actions/dashboard/warranty';
import setItemsPerPage from '../../../actions/dashboard/common';

const mapStateToProps = (state) => ({
    products: state.warrantyProducts.items,
    count: state.warrantyProducts.count,
    items: state.common
});

export default connect(
    mapStateToProps,
    {
        removeError,
        setItemsPerPage,
        getAll,
        search
    }
)(List);

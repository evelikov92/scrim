import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import { getAllCategories, search } from '../../../actions/products';
import setItemsPerPage from '../../../actions/dashboard/common';
import List from '../../../components/dashboard/products/List';

const mapStateToProps = (state) => {
    const { count, items } = state.products.categories;

    return {
        count,
        products: items,
        items: state.common
    };
};

export default connect(
    mapStateToProps,
    {
        removeError,
        getAllCategories,
        search,
        setItemsPerPage
    }
)(List);

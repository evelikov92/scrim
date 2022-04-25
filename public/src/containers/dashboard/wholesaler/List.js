import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import setItemsPerPage from '../../../actions/dashboard/common';
import { toggleState, getAll, search } from '../../../actions/dashboard/wholesaler';

import List from '../../../components/dashboard/wholesaler/List';

const mapStateToProps = (state) => ({
    wholesalers: state.wholesalers.items,
    count: state.wholesalers.count,
    items: state.common
});

export default connect(
    mapStateToProps,
    {
        removeError,
        setItemsPerPage,
        toggleState,
        getAll,
        search
    }
)(List);

import { connect } from 'react-redux';
import Edit from '../../../components/dashboard/warranty/Edit';
import removeError from '../../../../../public/src/actions/error';
import { get, update } from '../../../actions/dashboard/warranty';

const mapStateToProps = (state) => ({
    warranty: state.product
});

export default connect(
    mapStateToProps,
    {
        removeError,
        get,
        update
    }
)(Edit);

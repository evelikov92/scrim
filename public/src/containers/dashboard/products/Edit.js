import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import Edit from '../../../components/dashboard/products/Edit';

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    {
        removeError
    }
)(Edit);

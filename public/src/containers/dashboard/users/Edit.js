import { connect } from 'react-redux';
import { getUser, updateUser } from '../../../actions/dashboard/users';
import removeError from '../../../../../public/src/actions/error';
import Edit from '../../../components/dashboard/users/Edit';

const mapStateToProps = (state) => ({
    user: state.users.active
});

export default connect(
    mapStateToProps,
    {
        getUser,
        updateUser,
        removeError
    }
)(Edit);

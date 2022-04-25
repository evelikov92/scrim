import { connect } from 'react-redux';
import List from '../../../components/dashboard/users/List';
import { getAllUsers, deleteUser, openUser, clearAllUsers } from "../../../actions/dashboard/users";
import removeError from '../../../../../public/src/actions/error';

const mapStateToProps = (state) => ({
    users: state.users.list
});

export default connect(
    mapStateToProps,
    {
        getAllUsers,
        deleteUser,
        openUser,
        clearAllUsers,
        removeError
    }
)(List);

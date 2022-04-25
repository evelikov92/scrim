import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import { getAllRmaNotifications } from '../../../actions/dashboard/notifications';
import GetRmaNotifications from '../../../components/dashboard/notifications/GetRmaNotifications';

const mapStateToProps = (state) => ({
    notifications: state.notifications
});

export default connect(
    mapStateToProps,
    {
        removeError,
        getAllRmaNotifications
    }
)(GetRmaNotifications);

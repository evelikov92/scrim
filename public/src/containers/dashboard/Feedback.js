import { connect } from 'react-redux';
import Feedback from '../../components/dashboard/Feedback';
import removeError from '../../../../public/src/actions/error';
import { getAllFeedback } from '../../actions/dashboard/rma';

const mapStateToProps = (state) => ({
    feedback: state.feedback
});

export default connect(
    mapStateToProps,
    {
        removeError,
        getAllFeedback
    }
)(Feedback);

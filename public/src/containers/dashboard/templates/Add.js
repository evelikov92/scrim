import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import AddTemplate from '../../../components/dashboard/templates/Add';
import { add } from "../../../actions/dashboard/templates";

const mapStateToProps = (state) => ({
    error: state.error
});

export default connect(
    mapStateToProps,
    {
        removeError,
        add
    }
)(AddTemplate);

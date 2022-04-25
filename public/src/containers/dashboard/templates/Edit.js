import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import Edit from '../../../components/dashboard/templates/Edit';
import { get, update } from "../../../actions/dashboard/templates";

const mapStateToProps = (state) => ({
    template: state.templates.active
});

export default connect(
    mapStateToProps,
    {
        removeError,
        get,
        update
    }
)(Edit);

import { connect } from 'react-redux';
import removeError from '../../../../../public/src/actions/error';
import { getAll, open } from "../../../actions/dashboard/templates";
import List from '../../../components/dashboard/templates/List';

const mapStateToProps = (state) => ({
    templates: state.templates.list
});

export default connect(
    mapStateToProps,
    {
        getAll,
        removeError,
        open
    }
)(List);

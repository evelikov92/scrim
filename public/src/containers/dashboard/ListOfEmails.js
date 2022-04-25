import { connect } from 'react-redux';
import ListOfEmails from '../../components/dashboard/ListOfEmails';
import { getAllClientEmails } from '../../actions/dashboard/users';
import removeError from '../../../../public/src/actions/error';

const mapStateToProps = (state) => ({
    emails: state.emails
});

export default connect(
    mapStateToProps,
    {
        getAllClientEmails,
        removeError
    }
)(ListOfEmails);

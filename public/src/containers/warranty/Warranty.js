import { connect } from 'react-redux';
import resetError from '../../../../public/src/actions/error';
import Warranty from '../../components/warranty/Warranty';

const mapStateToProps = (state) => ({
    account: state.account
});

export default connect(
    mapStateToProps,
    {
        resetError
    }
)(Warranty);

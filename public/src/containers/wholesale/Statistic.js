import { connect } from 'react-redux';
import Statistic from '../../components/wholesale/Statistic';
import { getStatistics } from '../../actions/wholesale';
import removeError from '../../../../public/src/actions/error';

const mapStateToProps = (state) => ({
    statistic: state.statistic
});

export default connect(
    mapStateToProps,
    {
		getStatistics,
        removeError
    }
)(Statistic);

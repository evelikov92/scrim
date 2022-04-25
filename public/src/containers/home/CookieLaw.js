import { connect } from 'react-redux';
import CookieLaw from '../../components/home/CookieLaw';
import removeError from '../../../../public/src/actions/error';

export default connect(
    null,
    {
        removeError
    }
)(CookieLaw);

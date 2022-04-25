import { connect } from 'react-redux';
import resetError from '../../../../public/src/actions/error';
import { extend } from "../../actions/warranty";

import Extend from '../../components/warranty/Extend';

export default connect(
    null,
    {
        resetError,
        extend
    }
)(Extend);

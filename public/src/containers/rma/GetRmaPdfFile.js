import { connect } from 'react-redux';
import GetRmaPdf from '../../components/rma/GetRmaPdf';
import removeError from '../../../../public/src/actions/error';

const mapStateToProps = (state) => ({
    pdf: state.rmaPdf.file
});

export default connect(
    mapStateToProps,
    {
        removeError
    }
)(GetRmaPdf);

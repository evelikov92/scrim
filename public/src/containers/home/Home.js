import { connect } from 'react-redux';
import Home from '../../components/home/Home';

import removeError from '../../../../public/src/actions/error';
import { getSliderProducts } from "../../actions/products";

const mapStateToProps = state => ({
    sliders: state.products.slider,
    account: state.account
});

export default connect(
    mapStateToProps,
    {
        getSliderProducts,
        removeError
    },
)(Home);

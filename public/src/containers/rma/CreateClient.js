import { connect } from 'react-redux';
import { createClient, checkClient } from "../../actions/rma";
import removeError from '../../../../public/src/actions/error';
import CreateClient from '../../components/rma/CreateClient';
import { logInAsShop, getLoggedWholesaler } from "../../actions/wholesale";

const mapStateToProps = state => ({
    countries: state.countries,
    client: state.client,
    account: state.account
});

export default connect(
    mapStateToProps,
    {
        createClient,
        checkClient,
        removeError,
        logInAsShop,
        getLoggedWholesaler
    }
)(CreateClient);

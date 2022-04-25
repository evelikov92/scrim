import React from 'react';
import { connect } from 'react-redux';
import { activateAccount } from '../../../../public/src/actions/account';

import Spinner from '../../../../public/src/components/elements/spinner/index';

/**
 *
 */
class ActivateAccount extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.props.activateAccount(() => this.props.history.push('/account/login'), this.props.match.params.token);
    }

    render () {
        return <div id={'activate-account-page'}><Spinner headTagId={'activate-account-page'}/></div>;
    }
}

export default connect(
    null,
    { activateAccount },
)(ActivateAccount);

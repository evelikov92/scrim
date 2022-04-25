import React from 'react';

import Spinner from '../../../../public/src/components/elements/spinner';

class QRClientActivation extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false
        };
    }

    componentDidMount () {
        this.props.qrThreeYearActivation(
            this.props.match.params.code,
            () => this.props.history.push('/is-active'),
            () => this.setState({ isFetchingData: true })
        );
    }

    render () {
        return (
            <div id={'qr-client-activation'}>
                {!this.state.isFetchingData && <Spinner headTagId={'qr-client-activation'} />}
            </div>
        );
    }
}

export default QRClientActivation;

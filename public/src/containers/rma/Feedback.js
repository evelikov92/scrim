import React from 'react';
import { connect } from 'react-redux';
import { sendFeedback, sendFeedbackMessage } from '../../actions/rma';
import removeError from '../../../../public/src/actions/error';
import { Row, Col, Button, Input, FormGroup, Label } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

import Spinner from '../../../../public/src/components/elements/spinner';

class Feedback extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            isSendFeedbackMessage: false,
            feedbackMessage: ''
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.success = this.success.bind(this);
    }

    componentDidMount () {
        const { id, vote } = this.props.match.params;
        this.props.sendFeedback(id, vote, () => this.setState({ isFetchingData: true }));
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    success () {
        window.alert(getLanguageResources('common').thanksRmaFeedback);
        window.location.href = 'http://g-systems.eu';
    }

    sendMessage () {
        this.props.sendFeedbackMessage(
            this.props.match.params.id,
            this.state.feedbackMessage,
            this.success
        );
    }

    render () {
        const { common: { leaveMessage, rmaTeam, thanksRmaFeedback, whatImprove }, buttons: { finish } } = getLanguageResources();

        if (this.state.isFetchingData) {
            return (
                <Col>
                    <Row>
                        <Col>
                            {thanksRmaFeedback}
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col>
                            {leaveMessage}
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col xs={9}>
                            <FormGroup>
                                <Label htmlFor={'rma-feedback'}>{whatImprove}</Label>
                                <Input type={'textarea'}
                                       rows={10}
                                       onChange={(e) => this.setState({ feedbackMessage: e.target.value })}
                                       id={'rma-feedback'} />
                            </FormGroup>
                        </Col>
                        <Col style={{ position: 'relative' }} xs={3}>
                            <Button color={'success'} style={{ position: 'absolute', bottom: '5%' }} onClick={this.sendMessage}>{finish}</Button>
                        </Col>
                    </Row>

                    <br />

                    <Row>
                        <Col>
                            {rmaTeam}
                        </Col>
                    </Row>
                </Col>
            );
        } else {
            return (
                <Col id={'rma-feedback'}>
                    <Spinner headTagId='rma-feedback' />
                </Col>
            );
        }
    }
}

export default connect(
    null,
    {
        sendFeedback,
        sendFeedbackMessage,
        removeError
    }
)(Feedback);

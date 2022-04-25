import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

import Spinner from '../../../../../public/src/components/elements/spinner';
import RmaNotificationList from './RmaNotificationList';

class GetRmaNotifications extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: false,
            /**
             * Status of the select drop down menu
             */
            status: 'arrival',
            /**
             *
             * Title to show what state is showing now
             */
            title: 'Arrival'
        };

        this.selectRmaNotifications = this.selectRmaNotifications.bind(this);
    }

    componentDidMount () {
        this.props.getAllRmaNotifications(() => this.setState({ isFetchingData: true }));
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    selectRmaNotifications (value) {
        this.setState({ status: value, title: value.charAt(0).toUpperCase() + value.slice(1) });
    }

    render () {
        if (!this.state.isFetchingData) {
            return (
                <Row>
                    <Col id={'rma-notifications'}>
                        <Spinner headTagId={'rma-notifications'} />
                    </Col>
                </Row>
            );
        }

        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <FormGroup >
                                <Label for='select-rma-notifications'>RMA Notification Type</Label>
                                <Input type='select' id='select-rma-notifications' onChange={(e) => this.selectRmaNotifications(e.target.value)}>
                                    <option value={'arrival'}>Arrival</option>
                                    <option value={'repair'}>Repair</option>
                                    <option value={'payment'}>Payment</option>
                                    <option value={'send'}>Send</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <RmaNotificationList title={this.state.title} arr={this.props.notifications[this.state.status]} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

GetRmaNotifications.propTypes = {
    /**
     * All RMA notifications which is wait to change the status
     */
    notifications: PropTypes.object,
    /**
     * Get all notifications for Rma which wait to change the status
     * @param {Function} finish Action which will execute when the request is finish
     */
    getAllRmaNotifications: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired
};

export default GetRmaNotifications;

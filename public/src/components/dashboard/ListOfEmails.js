import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';

import Spinner from '../../../../public/src/components/elements/spinner';

class ListOfEmails extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false
        }
    }

    componentDidMount () {
        if (!this.props.emails) {
            this.props.getAllClientEmails(() => this.setState({ isFetchingData: true }));
        } else {
            this.setState({ isFetchingData: true });
        }
    }

    render () {
        if (!this.state.isFetchingData) {
            return (
                <Row id={'client-emails'}>
                    <Col>
                        <Spinner headTagId={'client-emails'} />
                    </Col>
                </Row>
            );
        }

        return (
            <Row>
                <Col className={'text-center'}>
                    <Card>
                        <CardHeader className={'text-center'}>All Client Emails</CardHeader>
                        <CardBody className={'text-center'}>
                            <Row>
                                <Col>
                                    <Button
                                        onClick={() => window.open(this.props.emails.shops)}
                                        color={'info'}
                                        className={'float-left'}>Shops</Button>

                                    <Button
                                        onClick={() => window.open(this.props.emails.clients)}
                                        color={'info'}
                                        className={'float-right'}>Clients</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ListOfEmails;
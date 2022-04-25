import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table } from 'reactstrap';

class Feedback extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            itemsPerPage: Number(this.props.items) || 10,
        }
    }

    componentDidMount () {
        this.props.getAllFeedback(this.setState({ isFetchingData: true }), this.props.match.params.page || 1, this.state.itemsPerPage);
    }

    render () {
        return (
            <Row>
                <Col>

                </Col>
            </Row>
        );
    }
}

export default Feedback;

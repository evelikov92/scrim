import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Button } from 'reactstrap';

import { RMA_STATUS } from '../../../../../public/src/utils/common';

class ManyProductStates extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [ '0' ],
            state: 0
        };

        this.selectItems = this.selectItems.bind(this);
        this.changeState = this.changeState.bind(this);
        this.updateProductStates = this.updateProductStates.bind(this);
    }

    changeState (value) {
        this.setState({ state: value });
    }

    selectItems (event) {
        let options = event.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }

        this.setState({ items: value });
    }

    updateProductStates () {
        this.props.changeStatus(this.state.items, Number(this.state.state));
        this.props.toggle();
    }

    render () {
        return (
            <Fragment>
                <Row>
                    <Col xs={6}>
                        <Input type={'select'} multiple onChange={e => this.selectItems(e)}>
                            {Object.keys(this.props.items).map((key, i) => {
                                return (
                                    <option key={key} value={i}>{this.props.items[key].serialNumber}</option>
                                );
                            })}
                        </Input>
                    </Col>
                    <Col xs={6}>
                        <Input type={'select'} onChange={e => this.changeState(e.target.value)}>
                            {RMA_STATUS.map(status => {
                                return (
                                    <option key={status.id} value={status.id}>{status.title}</option>
                                );
                            })}
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col className={'text-right'}>
                        <Button color={'info'} onClick={this.updateProductStates}>Upgrade</Button>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default ManyProductStates;

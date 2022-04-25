import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Card, CardBody, CardHeader, Button, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

import { getLanguageResources } from "../../../../../public/src/utils/language";
import Spinner from '../../../../../public/src/components/elements/spinner';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from "../../fields/Checkbox";

class EditWarranty extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            Active: null,
            StartDate: 1,
            StopDate: 1,
            isChange: false
        };

        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeStopDate = this.changeStopDate.bind(this);
        this.changeActive = this.changeActive.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    componentDidMount () {
        this.props.get(this.props.match.params.id,
            () => this.setState({
                isFetchingData: true,
                StartDate: this.props.warranty.StartDate ? moment.unix(this.props.warranty.StartDate) : moment.unix(Date.now() / 1000),
                StopDate: this.props.warranty.StopDate ? moment.unix(this.props.warranty.StopDate) : moment.unix(Date.now() / 1000),
                Active: this.props.warranty.Active
            })
        );
    }

    changeStartDate (date) {
        this.setState({
            isChange: true,
            StartDate: date
        });
    }

    changeStopDate (date) {
        this.setState({
            isChange: true,
            StopDate: date
        });
    }

    changeActive (event) {
        this.setState({
            isChange: true,
            Active: event.target.value
        });
    }

    formSubmit () {
        if (this.state.isChange) {
            this.setState({ isFetchingData: false });

            let Active = this.state.Active;
            let StartDate = this.state.StartDate.unix();
            let StopDate = this.state.StopDate.unix();

            this.props.update(
                { Active, StartDate, StopDate },
                this.props.match.params.id,
                () => this.props.history.goBack(),
                this.setState({ isFetchingData: true })
            );
        } else {
            this.props.history.goBack();
        }
    }

    render () {
        if (!this.state.isFetchingData) {
            return (
                <Col id={'product-warranty-open'}>
                    <Spinner headTagId={'product-warranty-open'} />
                </Col>
            )
        } else if (this.props.warranty.SerialNumber) {
            const { buttons: { update }, labels: { startDate, endDate, active } } = getLanguageResources();

            return (
                <Card>
                    <CardHeader className={'text-center'}>Product {this.props.warranty.SerialNumber}</CardHeader>
                    <CardBody>
                        <Form id='edit-warranty-product-form'>
                            <FormGroup>
                                <legend className={'text-center'}>Product</legend>

                                <Row>
                                    <Col>
                                        <Field
                                            id='product-active'
                                            label={active}
                                            name='Active'
                                            isChecked={this.state.Active}
                                            onChange={this.changeActive}
                                            component={Checkbox} />
                                    </Col>

                                    <Col>
                                        <FormGroup>
                                            <Label for={'StartDate'}>{startDate}</Label>
                                            <DatePicker
                                                dateFormat="DD.MM.YYYY"
                                                id={'StartDate'}
                                                selected={this.state.StartDate}
                                                onChange={this.changeStartDate} />
                                        </FormGroup>
                                    </Col>

                                    <Col>
                                        <FormGroup>
                                            <Label for={'StopDate'}>{endDate}</Label>
                                            <DatePicker
                                                dateFormat="DD.MM.YYYY"
                                                id={'StopDate'}
                                                selected={this.state.StopDate}
                                                onChange={this.changeStopDate} />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Button onClick={this.formSubmit} color='success' className='float-right'>
                                            {update}
                                        </Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            )
        } else {
            return null;
        }
    }
}

export default reduxForm({
    form: 'edit-warranty-product-form'
})(EditWarranty);

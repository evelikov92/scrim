import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Row, Col, Button, Card, CardBody, FormGroup } from 'reactstrap';

import Text from '../../../../../public/src/components/fields/Text';
import Comment from '../../fields/Comment';

import Spinner from '../../../../../public/src/components/elements/spinner';
import {getLanguageResources} from "../../../../../public/src/utils/language";

class Add extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: true
        };

        this.formSubmit = this.formSubmit.bind(this);
        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    formSubmit (values) {
        this.setState({ isFetchingData: false });
        this.props.add(values, this.success, this.failed)
    }

    success () {
        this.props.history.push('/dashboard/templates');
    }

    failed () {
        this.setState({ isFetchingData: true });
    }

    render () {
        const { titles: { createTemplate }, labels: { title, category, message }, buttons: { create } } = getLanguageResources();

        return (
            <Row>
                <Col sm={{ size: 10, offset: 1 }}>
                    <Card>
                        <CardBody>

                            <Form id='add-new-template'
                                  onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                                {!this.state.isFetchingData && <Spinner headTagId='add-new-template' />}

                                <FormGroup tag='fieldset'>
                                    <legend className='text-center'>{createTemplate}</legend>

                                    <Row>
                                        <Col>
                                            <Field
                                                required
                                                type='text'
                                                label={title}
                                                id='template-title'
                                                name='title'
                                                component={Text} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Field
                                                required
                                                type='text'
                                                label={category}
                                                id='template-category'
                                                name='category'
                                                component={Text} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Field
                                                required
                                                label={message}
                                                rows={8}
                                                id='template-message'
                                                name='template'
                                                component={Comment} />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Button className='float-right' color='info' size='sm'>{create}</Button>
                                        </Col>
                                    </Row>
                                </FormGroup>

                            </Form>
                        </CardBody>
                    </Card>


                </Col>
            </Row>
        )
    }
}

function validate (values) {
    const errors = { };

    return errors;
}

export default reduxForm({
    validate,
    form: 'add-new-template'
})(Add);

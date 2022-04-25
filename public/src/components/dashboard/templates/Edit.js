import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Row, Col, Form, FormGroup, Button, Card, CardBody } from 'reactstrap';

import Text from '../../../../../public/src/components/fields/Text';
import Comment from '../../fields/Comment';
import Spinner from '../../../../../public/src/components/elements/spinner';

import { getLanguageResources } from "../../../../../public/src/utils/language";

class EditTemplate extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false
        };

        this.finish = this.finish.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.success = this.success.bind(this);
        this.failed = this.failed.bind(this);
    }

    componentDidMount () {
        this.props.get(this.props.match.params.id, this.finish);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    finish () {
        this.setState({ isFetchingData: true });
        if (this.props.template.hasOwnProperty('id')) {
            this.props.initialize(this.props.template);
        }
    }

    formSubmit (values) {
        this.setState({ isFetchingData: false });
        this.props.update(this.props.match.params.id, values, this.success, this.failed);
    }

    success () {
        this.props.history.push('/dashboard/templates');
    }

    failed () {
        this.setState({ isFetchingData: true });
    }

    render () {
        const { titles: { editTemplate }, labels: { title, category, message }, buttons: { finish } } = getLanguageResources();

        return (
            <Row>
                <Col sm={{ size: 10, offset: 1 }}>
                    <Card>
                        <CardBody>

                            <Form id='edit-template-message'
                                  onSubmit={this.props.handleSubmit(values => this.formSubmit(values))} >

                                {!this.state.isFetchingData && <Spinner headTagId='edit-template-message' />}

                                <FormGroup tag='fieldset'>
                                    <legend className='text-center'>{editTemplate}</legend>

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
                                            <Button className='float-right' color='info' size='sm'>{finish}</Button>
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
    form: 'edit-template-message',
    validate
})(EditTemplate);

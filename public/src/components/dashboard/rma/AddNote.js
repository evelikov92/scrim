import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input } from 'reactstrap';
import { getLanguageResources } from '../../../../../public/src/utils/language';
import { setCorrectRmaStatusPossibilities } from "../../../../../public/src/utils/common";

const AddNote = (props) => {
    const { labels: { description, message, status }, titles: { updateItemStatus } } = getLanguageResources();
    let rmaItemStatus = setCorrectRmaStatusPossibilities(props.status);

    return (
        <Card>
            <CardHeader className='text-center card-header-fourth'>{updateItemStatus}</CardHeader>
            <CardBody>
                <Row>
                    <Col>
                        <FormGroup row>
                            <Label lg={2} htmlFor={`item-status-${props.item.id}`}>{status}</Label>
                            <Col lg={10}>
                                <Input
                                    type={'select'}
                                    id={'item-status'}
                                    value={props.item.status}
                                    onChange={(e) => props.changeStatus(e.target.value, props.itemIndex)}>
                                    {rmaItemStatus.map(status => {
                                        return (
                                            <option value={status.id} key={status.id}>{status.title}</option>
                                        );
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup row>
                            <Label htmlFor={`template-message-${props.item.id}`} lg={2}>{message}</Label>
                            <Col lg={10}>
                                <Input
                                    type={'select'}
                                    id={'template-message'}
                                    onChange={(e) => props.changeMessage(props.templates[e.target.value].template, props.itemIndex)}>
                                    {props.templates.map((template, i) => {
                                        return (
                                            <option value={i} key={i}>{template.title}</option>
                                        );
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        Length: {1000 - props.item.message.length} Symbols
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroup row>
                            <Label lg={2} htmlFor={`item-description-${props.item.id}`}>{description}:</Label>
                            <Col lg={10}>
                                <Input
                                    type={'textarea'}
                                    name={'text'}
                                    id={'item-description'}
                                    rows={8}
                                    value={props.item.message}
                                    onChange={(e) => props.changeMessage(e.target.value, props.itemIndex)} />
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            type={'file'}
                            name={'file'}
                            id={`note-file-${props.item.id}`}
                            onChange={(e) => props.changeFile(e.target.files[0], props.itemIndex)} />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
};

export default AddNote;

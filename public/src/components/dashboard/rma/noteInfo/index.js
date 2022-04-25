import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { getLanguageResources } from '../../../../../../public/src/utils/language';

import { RMA_STATUS } from '../../../../../../public/src/utils/common';

const NoteInfo = ({ note, index }) => {
    const { labels: { status, description, file, date }, roles: { operator } } = getLanguageResources();

    return (
        <Card key={index}>
            <CardBody>
                <Row>
                    <Col lg={6}><strong> {date}: </strong> &nbsp; {new Date(note.created_at * 1000).toLocaleString()}</Col>
                    <Col lg={6}><strong> {status}: </strong> &nbsp; {RMA_STATUS[note.status_id].title}</Col>
                </Row>

                <Row>
                    <Col><strong> {operator}: </strong> &nbsp; {note.username}</Col>
                </Row>

                <Row>
                    <Col><strong> {description} </strong> &nbsp; {note.fulltext.split('\n').map((text, i) => <span key={i}>{text}<br /></span>)}</Col>
                </Row>

                <Row>
                    {note.urltofile && <Col><strong> {file}: </strong> &nbsp; <a href={note.urltofile} target='_blank' rel='noopener noreferrer'>{note.urltofile}</a></Col>}
                </Row>

            </CardBody>
        </Card>
    );
};

export default NoteInfo;

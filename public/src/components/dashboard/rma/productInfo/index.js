import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap';
import { getLanguageResources } from "../../../../../../public/src/utils/language";
import { RMA_STATUS } from "../../../../../../public/src/utils/common";

import NoteInfo from '../noteInfo';

const RMAProductInfo = (props) => {
    const { warrantyStatus: { notActive, active, expired }, titles: { itemStatusInfo }, labels: { serial, rmaItem, notes, status, warrantyStatus, defect, file } } = getLanguageResources();

    let warStatus = notActive;
    if (props.item.Active && Date.now() <= props.item.StopDate * 1000) {
        warStatus = active;
    } else if (!Number(props.item.isExpired) && props.item.Active && Date.now() > props.item.StopDate * 1000) {
        warStatus = expired;
    } else if (Number(props.item.isExpired)) {
        warStatus = active;
    }

    let warrantyTime = null;
    if (props.item.StopDate) {
        warrantyTime = new Date(props.item.StopDate * 1000).toLocaleDateString();
    } else {
        warrantyTime = new Date(props.item.sale * 1000).toLocaleDateString();
    }

    return [
        <Card key={props.item.id}>
            <CardHeader className='text-center font-weight-bold card-header-fourth'>{itemStatusInfo}</CardHeader>
            <CardBody>
                <Row>
                    <Col lg={6}><strong>{serial}:</strong> {props.item.serialNumber}</Col>
                    <Col lg={6}><strong>{rmaItem}:</strong> {props.item.Name}</Col>

                    <hr />

                    <Col lg={6}><strong>{warrantyStatus}:</strong> {warStatus} - {warrantyTime}</Col>
                    <Col lg={6}><strong>{status}:</strong> {RMA_STATUS[props.status].title}</Col>
                </Row>

                <Row>
                    <Col><strong>{defect}:</strong> {props.item.defect}</Col>
                </Row>

                {props.item.file && <Row>
                    <Col><strong>{file}:</strong> <a href={props.item.file} target={'_blank'}>{props.item.file}</a></Col>
                </Row>}

                <br />

                <Row>
                    <Col>
                        <Card>
                            <CardHeader className='text-center font-weight-bold card-header-fifth'>{notes}: </CardHeader>
                            {props.item.notes.map((note, index) => {
                                return (
                                    <NoteInfo key={note.id} note={note} index={index} />
                                );
                            })}
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>,
        <br key={Number(props.item.id) + 2000} />
    ];
};

export default RMAProductInfo;

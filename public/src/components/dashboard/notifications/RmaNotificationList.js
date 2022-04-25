import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Table } from 'reactstrap';
import { RMA_STATUS } from '../../../../../public/src/utils/common';
import { getLanguageResources } from '../../../../../public/src/utils/language';

const RmaNotificationList = ({ title, arr }) => {
    const { labels: { rmaNumber, status, lastUpdate, category, serial, email } } = getLanguageResources();

    return (
        <Card>
            <CardHeader className={'text-center'}>{title}</CardHeader>
            <CardBody>
                <Table responsive bordered striped>
                    <thead>
                        <tr>
                            <th>{rmaNumber}</th>
                            <th>{category}</th>
                            <th>{serial}</th>
                            <th>{email}</th>
                            <th>{status}</th>
                            <th>{lastUpdate}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.rma_id}</td>
                                    <td>{element.Name}</td>
                                    <td>{element.SerialNumber}</td>
                                    <td>{element.Email}</td>
                                    <td>{RMA_STATUS[Number(element.status)].title}</td>
                                    <td>{new Date(element.updated_at * 1000).toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

RmaNotificationList.propTypes = {
    title: PropTypes.string.isRequired,
    arr: PropTypes.array.isRequired
};

export default RmaNotificationList;

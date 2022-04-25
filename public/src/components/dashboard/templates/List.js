import React from 'react';
import { Col, Row, Table, Button, Card, CardHeader, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

import Spinner from '../../../../../public/src/components/elements/spinner/index'

import { getLanguageResources } from "../../../../../public/src/utils/language";

class ListAllMessages extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false
        };

        this.openTemplate = this.openTemplate.bind(this);
    }

    componentDidMount () {
        if (!this.props.templates.length) {
            this.props.getAll(() => this.setState({ isFetchingData: true }));
        } else {
            this.setState({ isFetchingData: true });
        }
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    openTemplate (index, id) {
        this.props.open(index, () => this.props.history.push(`/dashboard/templates/open/${id}`));
    }

    render () {
        const { labels: { number, title, category, createDate, updateDate }, buttons: { update, create }, titles: { listOfTemplates } } = getLanguageResources();

        let content = null;
        if (this.props.templates) {
            content = <tbody>
                {this.props.templates.map((template, i) => {
                    return (
                        <tr key={i}>
                            <td className='table-vertical-align'>{template.id}</td>
                            <td className='table-vertical-align'>{template.title}</td>
                            <td className='table-vertical-align'>{template.category}</td>
                            <td className='table-vertical-align'>{new Date(template.created_at * 1000).toLocaleDateString()}</td>
                            <td className='table-vertical-align'>{new Date(template.updated_at * 1000).toLocaleDateString()}</td>
                            <td className='table-vertical-align'>
                                <Button className='float-left col' color='info' onClick={() => this.openTemplate(i, template.id)}>{update}</Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        }

        return (
            <Row id='list-of-template-messages'>
                {!this.state.isFetchingData && <Spinner headTagId='list-of-template-messages' />}

                <Col>
                    <Card>
                        <CardHeader className='text-center'>{listOfTemplates}</CardHeader>
                        <CardBody>
                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th className='table-vertical-align'>{number}</th>
                                        <th className='table-vertical-align'>{title}</th>
                                        <th className='table-vertical-align'>{category}</th>
                                        <th className='table-vertical-align'>{createDate}</th>
                                        <th className='table-vertical-align'>{updateDate}</th>
                                        <th className='table-vertical-align'>
                                            <Button className='float-right col' color='info' onClick={() => this.props.history.push('/dashboard/templates/add')}>{create}</Button>
                                        </th>
                                    </tr>
                                </thead>
                                {content}
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ListAllMessages;

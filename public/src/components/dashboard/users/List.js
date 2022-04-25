import React from 'react';
import { Table, Row, Col, Button, Card, CardHeader, CardBody, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import Spinner from '../../../../../public/src/components/elements/spinner/index';
import { getLanguageResources } from "../../../../../public/src/utils/language";

class Users extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false
        };

        this.toggleStatus = this.toggleStatus.bind(this);
        this.openUser = this.openUser.bind(this);
    }

    componentDidMount () {
        this.props.getAllUsers(() => this.setState({ isFetchingData: true }));
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    toggleStatus (id, index, status) {
        this.setState({ isFetchingData: false });
        this.props.deleteUser(this.props.users[index].id, index, Number(status), () => this.setState({ isFetchingData: true }));
    }

    openUser (index, id) {
        this.props.openUser(index, () => this.props.history.push(`/dashboard/users/open/${id}`));
    }

    render () {
        const { titles: { listOfUsers }, labels: { username, email, role }, buttons: { create, update, remove } } = getLanguageResources();

        return (
            <Row id='list-of-users'>
                {!this.state.isFetchingData && <Spinner headTagId='list-of-users' />}
                <Col>
                    <Card>
                        <CardHeader className='text-center'>{listOfUsers}</CardHeader>
                        <CardBody>
                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th className='table-vertical-align'>{username}</th>
                                        <th className='table-vertical-align'>{email}</th>
                                        <th className='table-vertical-align'>{role}</th>
                                        <th colSpan={2} className='table-vertical-align'>
                                            <Button className='float-right col' color='info' onClick={() => this.props.history.push('/dashboard/users/add')}>{create}</Button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.users.map((user, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='table-vertical-align'>{user.username}</td>
                                                <td className='table-vertical-align'>{user.email}</td>
                                                <td className='table-vertical-align'>{user.role}</td>
                                                <td className='table-vertical-align'>
                                                    <Button className='float-left' color='info' onClick={() => this.openUser(i, user.id)}>{update}</Button>
                                                </td>
                                                <td className='table-vertical-align'>
                                                    <Label className='ux-checkbox' id={user.id}>
                                                        <Input
                                                            type='checkbox'
                                                            className='material-checkbox'
                                                            checked={!user['is_deleted']}
                                                            onChange={() => this.toggleStatus(user.id, i, user['is_deleted'])}
                                                            id={user.id} /> &nbsp;
                                                        <span className='material-checkbox-title' />
                                                    </Label>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

Users.propTypes = {
    users: PropTypes.array,
    deleteUser: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    openUser: PropTypes.func.isRequired
};

export default Users;

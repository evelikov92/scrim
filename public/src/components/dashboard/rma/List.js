import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Card, CardHeader, CardBody, Row, Col, Input, Button, ButtonGroup } from 'reactstrap';
import { getLanguageResources } from "../../../../../public/src/utils/language";

import Spinner from '../../../../../public/src/components/elements/spinner/index';
import Paginator from '../../elements/paginator';

import { RMA_STATUS } from "../../../../../public/src/utils/common";

class ListOfRma extends React.Component {
    constructor (props) {
        super(props);

        this.baseSort = {
            id: '',
            status: '',
            email: '',
            created_at: '',
            updated_at: ''
        };

        this.state = {
            isFetchingData: false,
            itemsPerPage: Number(this.props.items) || 10,
            search: {
                id: '',
                status: 0,
                email: '',
                created_at: '',
                updated_at: ''
            },
            serialNumber: null,
            category: null,
            sort: this.baseSort,
            statusIsChanged: false
        };

        this.search = this.search.bind(this);
        this.sort = this.sort.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.searchEnterClick = this.searchEnterClick.bind(this);
        this.searchByProduct = this.searchByProduct.bind(this);
        this.searchByCategory = this.searchByCategory.bind(this);
    }

    componentDidMount () {
        this.props.getAllRMAItems(() => this.setState({ isFetchingData: true }), this.props.match.params.page || 1, this.state.itemsPerPage);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    componentWillReceiveProps (newProps) {
        if (newProps === undefined) return;

        const { page } = newProps.match.params;
        if (page && Number(this.props.match.params.page) !== Number(page)) {
            this.setState({ isFetchingData: false });

            const { sort, search, statusIsChanged } = this.state;

            if (search.id || search.email || search.created_at || search.updated_at || statusIsChanged || sort.id || sort.status || sort.email || sort.created_at || sort.updated_at) {
                this.props.search(() => this.setState({ isFetchingData: true }), search, sort, page, this.state.itemsPerPage);
            } else {
                this.props.getAllRMAItems(() => this.setState({ isFetchingData: true }), page, this.state.itemsPerPage);
            }
        }
    }

    searchEnterClick (event) {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    search () {
        this.setState({ isFetchingData: false });
        this.props.search(() => this.setState({ isFetchingData: true }), this.state.search, this.state.sort, 1, this.state.itemsPerPage);
        this.props.setItemsPerPage(this.state.itemsPerPage);
    }

    searchByProduct () {
        if (this.state.serialNumber && !isNaN(this.state.serialNumber)) {
            this.setState({ isFetchingData: false });
            this.props.getRmaBySerialNumber(this.state.serialNumber, () => this.setState({isFetchingData: true}));
        }
    }

    searchByCategory () {
        if (this.state.category) {
            this.setState({ isFetchingData: false });
            this.props.getRmaByCategory(this.state.category, () => this.setState({ isFetchingData: true }));
        }
    }

    sort (column) {
        this.setState({
            isFetchingData: false,
            sort: {
                ...this.baseSort,
                [column]: !this.state.sort[column] || this.state.sort[column] === 'desc' ? 'asc' : 'desc'
            }
        }, () => this.props.search(() => this.setState({ isFetchingData: true }), this.state.search, this.state.sort, 1, this.state.itemsPerPage));
    }

    changeStatus (status) {
        this.setState({
            statusIsChanged: true,
            search: {
                ...this.state.search,
                status
            }
        });
    }

    goToPage (newPage) {
        this.props.history.push(`/dashboard/rma/${newPage}`);
    }

    render () {
        const { buttons: { open, search }, titles: { rmaItems }, labels: { number, client, status, createDate, lastUpdate, action } } = getLanguageResources();

        let content = null;
        const oneDay = 86400000;
        const today = Date.now();
        if (this.props.rmaList) {
            content = [
                <tbody key='body'>
                    {this.props.rmaList.map(rma => {
                        let title = '';
                        let statusFailed = false;

                        if (this.props.hasOwnProperty('status') && this.props.status.hasOwnProperty(rma.id)) {
                            let titles = {};
                            Object.keys(this.props.status[rma.id]).map(key => {
                                let status = Number(this.props.status[rma.id][key]);
                                titles[RMA_STATUS[status].title] = 1;

                                if (!statusFailed) {
                                    statusFailed = (status !== 0 && status !== 9 && status !== 10);
                                }
                            });
                            title = Object.keys(titles).join(' / ');
                        } else {
                            let status = Number(rma.status);
                            statusFailed = (status !== 0 && status !== 9 && status !== 10);
                            title = RMA_STATUS[rma.status].title;
                        }

                        let classes = '';
                        if (statusFailed) {
                            let milliseconds = rma.updated_at * 1000;
                            const date = new Date(milliseconds);
                            const weekDay = date.getDay();
                            if (weekDay === 4 || weekDay === 5) { // + 4 days before alarm
                                if (today - oneDay * 4 > milliseconds) {
                                    classes = 'rma-forget';
                                }
                            } else { // +2 days before alarm
                                if (today - oneDay * 2 > milliseconds) {
                                    classes = 'rma-forget';
                                }
                            }
                        }

                        return (
                            <tr key={rma.id} className={classes}>
                                <td className='table-vertical-align'>{rma.id}</td>
                                <td className='table-vertical-align'>{rma.clientEmail}</td>
                                <td className='table-vertical-align'>
                                    {title}
                                </td>
                                <td className='table-vertical-align'>{new Date(rma.created_at * 1000).toLocaleDateString()}</td>
                                <td className='table-vertical-align'>{new Date(rma.updated_at * 1000).toLocaleDateString()}</td>
                                <td className='table-vertical-align'>
                                    <Link className='btn btn-sm btn-info col' to={`/dashboard/rma/open/${rma.id}`}>{open}</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>,
                <tfoot key='foot'>
                    <tr>
                        <td className='table-vertical-align' colSpan={1}>
                            <ButtonGroup>
                                <Button color={this.state.itemsPerPage === 10 ? 'primary' : 'warning'}
                                        onClick={() => this.setState({ itemsPerPage: 10 }, () => this.search()) }
                                        active={this.state.itemsPerPage === 10}>
                                    10
                                </Button>
                                <Button color={this.state.itemsPerPage === 50 ? 'primary' : 'warning'}
                                        onClick={() => this.setState({ itemsPerPage: 50 }, () => this.search()) }
                                        active={this.state.itemsPerPage === 50}>
                                    50
                                </Button>
                                <Button color={this.state.itemsPerPage === 100 ? 'primary' : 'warning'}
                                        onClick={() => this.setState({ itemsPerPage: 100 }, () => this.search()) }
                                        active={this.state.itemsPerPage === 100}>
                                    100
                                </Button>
                            </ButtonGroup>
                        </td>
                        <td className='table-vertical-align' colSpan={5}>
                            <Paginator
                                goToPage={this.goToPage}
                                linkList='dashboard/rma'
                                margin={3}
                                numberOfItemsPerPage={this.state.itemsPerPage}
                                countOfItems={this.props.count}
                                page={Number(this.props.match.params.page) || 1} />
                        </td>
                    </tr>
                </tfoot>
            ];
        }

        return (
            <Row>
                <Col id='list-of-rma'>
                    {!this.state.isFetchingData && <Spinner headTagId='list-of-rma' />}

                    <Card>
                        <CardHeader className='text-center'>{rmaItems}</CardHeader>
                        <CardBody>
                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th className={'text-center table-vertical-align'}>Search RMA by Product Name</th>
                                        <th colSpan={4} className={'table-vertical-align'}>
                                            <Input value={this.state.category}
                                                onChange={(e) => this.setState({ category: e.target.value })} />
                                        </th>
                                        <th className={'table-vertical-align'}>
                                            <Button className='col' size='sm' onClick={this.searchByCategory} color='info'>{search}</Button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className={'text-center table-vertical-align'}>Search RMA by Serial Number</th>
                                        <th colSpan={4} className={'table-vertical-align'}>
                                            <Input value={this.state.serialNumber}
                                                onChange={(e) => this.setState({ serialNumber: e.target.value })} />
                                        </th>
                                        <th className={'table-vertical-align'}>
                                            <Button className='col' size='sm' onClick={this.searchByProduct} color='info'>{search}</Button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.id}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, id: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.email}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, email: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                type='select'
                                                value={this.state.status}
                                                onChange={(e) => this.changeStatus(e.target.value)}>
                                                    {RMA_STATUS.map(status => {
                                                        return (
                                                            <option value={status.id} key={status.id}>{status.title}</option>
                                                        );
                                                    })}
                                            </Input>
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.created_at}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, created_at: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.updated_at}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, updated_at: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Button className='col' size='sm' onClick={this.search} color='info'>{search}</Button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('id')}>
                                            {number} &nbsp;
                                            {(!this.state.sort.id || this.state.sort.id === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.id && this.state.sort.id === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('email')}>
                                            {client} &nbsp;
                                            {(!this.state.sort.email || this.state.sort.email === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.email && this.state.sort.email === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('status')}>
                                            {status} &nbsp;
                                            {(!this.state.sort.status || this.state.sort.status === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.status && this.state.sort.status === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('created_at')}>
                                            {createDate} &nbsp;
                                            {(!this.state.sort.created_at || this.state.sort.created_at === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.created_at && this.state.sort.created_at === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('updated_at')}>
                                            {lastUpdate} &nbsp;
                                            {(!this.state.sort.updated_at || this.state.sort.updated_at === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.updated_at && this.state.sort.updated_at === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align text-center'>{action}</th>
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

export default ListOfRma;

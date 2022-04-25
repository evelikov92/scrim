import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Input, Card, CardHeader, CardBody, ButtonGroup } from 'reactstrap';

import { getLanguageResources } from "../../../../../public/src/utils/language";

import Spinner from '../../../../../public/src/components/elements/spinner';
import Paginator from '../../elements/paginator';

class List extends React.Component {
    constructor (props) {
        super(props);

        this.baseSort = {
            serial: '',
            title: '',
            start: '',
            end: '',
            client: '',
            created: '',
            update: ''
        };

        this.state = {
            isFetchingData: false,
            itemsPerPage: Number(this.props.items) || 10,
            search: {
                serial: '',
                title: '',
                start: '',
                end: '',
                client: '',
                created: '',
                update: ''
            },
            sort: this.baseSort
        };

        this.sort = this.sort.bind(this);
        this.search  = this.search.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.searchEnterClick = this.searchEnterClick.bind(this);
    }

    componentDidMount () {
        this.props.getAll(() => this.setState({ isFetchingData: true }), this.props.match.params.page || 1, this.state.itemsPerPage);
    }

    componentWillUnmount () {
        this.props.removeError();
    }

    componentWillReceiveProps (newProps) {
        if (newProps === undefined) return;

        const { page } = newProps.match.params;
        if (page && Number(this.props.match.params.page) !== Number(page)) {
            this.setState({ isFetchingData: false });

            const { sort, search } = this.state;

            if (search.serial || search.title || search.start || search.end || search.client || search.created ||
                sort.serial || sort.title || sort.start || sort.end || sort.client || sort.created) {
                this.props.search(() => this.setState({ isFetchingData: true }), search, sort, page, this.state.itemsPerPage);
            } else {
                this.props.getAll(() => this.setState({ isFetchingData: true }), page, this.state.itemsPerPage);
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

    sort (column) {
        this.setState({
            isFetchingData: false,
            sort: {
                ...this.baseSort,
                [column]: !this.state.sort[column] || this.state.sort[column] === 'desc' ? 'asc' : 'desc'
            }
        }, () => this.props.search(() => this.setState({ isFetchingData: true }), this.state.search, this.state.sort, 1, this.state.itemsPerPage));
    }

    goToPage (newPage) {
        this.props.history.push(`/dashboard/warranty/${newPage}`);
    }

    render () {
        const { buttons: { open, search }, titles: { warrantyProducts }, labels: { serial, product, startDate, endDate, createDate, updateDate, action, client } } = getLanguageResources();

        let content = null;
        if (this.props.products) {
            content = [
                <tbody key='body'>
                    {this.props.products.map((product, i) => {
                        return (
                            <tr key={i}>
                                <td className='table-vertical-align'>{product.SerialNumber}</td>
                                <td className='table-vertical-align'>{product.Name}</td>
                                <td className='table-vertical-align'>{product.StartDate ? new Date(product.StartDate * 1000).toLocaleDateString() : ''}</td>
                                <td className='table-vertical-align'>{product.StopDate ? new Date(product.StopDate * 1000).toLocaleDateString() : ''}</td>
                                <td className='table-vertical-align'>{product.ClientName}</td>
                                <td className='table-vertical-align'>{new Date(product.created_at * 1000).toLocaleDateString()}</td>
                                <td className='table-vertical-align'>{new Date(product.updated_at * 1000).toLocaleDateString()}</td>
                                <td className='table-vertical-align'>
                                    <Button className='col' size='sm' color='info'
                                            onClick={() => this.props.history.push(`/dashboard/warranty/open/${product.id}`)}>
                                        {open}
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>,
                <tfoot key='foot'>
                    <tr>
                        <td className={'table-vertical-align'} colSpan={1}>
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
                        <td className='table-vertical-align' colSpan={7}>
                            <Paginator
                                linkList='dashboard/warranty'
                                goToPage={this.goToPage}
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
                <Col id='list-of-product-warranties'>
                    {!this.state.isFetchingData && <Spinner headTagId='list-of-product-warranties' />}

                    <Card>
                        <CardHeader className='text-center'>{warrantyProducts}</CardHeader>
                        <CardBody>
                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.serial}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, serial: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.title}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, title: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.start}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.start, start: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.end}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.end, end: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.client}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.client, client: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.created}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.created, created: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.updated}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.updated, updated: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Button className='col' color='info' size='sm' onClick={this.search}>{search}</Button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('serial')}>
                                            {serial} &nbsp;
                                            {(!this.state.sort.serial || this.state.sort.serial === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.serial && this.state.sort.serial === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('title')}>
                                            {product} &nbsp;
                                            {(!this.state.sort.title || this.state.sort.title === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.title && this.state.sort.title === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('start')}>
                                            {startDate} &nbsp;
                                            {(!this.state.sort.start || this.state.sort.start === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.start && this.state.sort.start === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('end')}>
                                            {endDate} &nbsp;
                                            {(!this.state.sort.end || this.state.sort.end === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.end && this.state.sort.end === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('client')}>
                                            {client} &nbsp;
                                            {(!this.state.sort.client || this.state.sort.client === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.client && this.state.sort.client === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('created')}>
                                            {createDate} &nbsp;
                                            {(!this.state.sort.created || this.state.sort.created === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.created && this.state.sort.created === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('updated')}>
                                            {updateDate} &nbsp;
                                            {(!this.state.sort.updated || this.state.sort.updated === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.updated && this.state.sort.updated === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align'>{action}</th>
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

export default List;

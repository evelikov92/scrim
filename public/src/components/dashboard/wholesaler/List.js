import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Button, Label, Input, Card, CardBody, CardHeader, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

import { getLanguageResources } from "../../../../../public/src/utils/language";

import Spinner from '../../../../../public/src/components/elements/spinner/index';
import Paginator from '../../elements/paginator';

class List extends React.Component {
    constructor (props) {
        super(props);

        this.baseSort = {
            vat: '',
            company: '',
            created_at: '',
            is_disabled: '',
            city: '',
            country: '',
            email: ''
        };

        this.state = {
            isFetchingData: false,
            itemsPerPage: Number(this.props.items) || 10,
            search: {
                vat: '',
                company: '',
                created_at: '',
                city: '',
                country: '',
                email: ''
            },
            sort: this.baseSort
        };

        this.sort = this.sort.bind(this);
        this.search = this.search.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
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

        const page = newProps.match.params.page;
        if (page && Number(this.props.match.params.page) !== Number(page)) {
            this.setState({ isFetchingData: false });

            const { sort, search } = this.state;

            if (search.vat || search.company || search.created_at || sort.vat || sort.company || sort.created_at) {
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

    sort (column) {
        this.setState({
            isFetchingData: false,
            sort: {
                ...this.baseSort,
                [column]: !this.state.sort[column] || this.state.sort[column] === 'desc' ? 'asc' : 'desc'
            }
        }, () => this.props.search(() => this.setState({ isFetchingData: true }), this.state.search, this.state.sort, 1, this.state.itemsPerPage));
    }

    search () {
        this.setState({ isFetchingData: false });
        this.props.search(() => this.setState({ isFetchingData: true }), this.state.search, this.state.sort, 1, this.state.itemsPerPage);
        this.props.setItemsPerPage(this.state.itemsPerPage);
    }

    toggleStatus (id, index, nextStatus) {
        this.setState({ isFetchingData: false });
        this.props.toggleState(id, index, nextStatus, () => this.setState({ isFetchingData: true }));
    }

    goToPage (newPage) {
        this.props.history.push(`/dashboard/wholesalers/${newPage}`);
    }

    render () {
        const { titles: { wholesalers }, buttons: { search, open }, labels: { vat, createDate, company, active, city, country, action, email } } = getLanguageResources();
        let content = null;

        if (this.props.wholesalers) {
            content = [
                <tbody key='body'>
                    {this.props.wholesalers.map((wholesaler, i) => {
                        return (
                            <tr key={wholesaler.id}>
                                <td className='table-vertical-align'>
                                    <Label className='ux-checkbox' id={wholesaler.id}>
                                        <Input
                                            type='checkbox'
                                            className='material-checkbox'
                                            checked={!wholesaler['is_disabled']}
                                            onChange={() => this.toggleStatus(wholesaler.id, i, wholesaler['is_disabled'])}
                                            id={wholesaler.id} /> &nbsp;
                                            <span className='material-checkbox-title' />
                                    </Label>
                                </td>
                                <td className='table-vertical-align'>{wholesaler.vat}</td>
                                <td className='table-vertical-align'>{wholesaler.Email}</td>
                                <td className='table-vertical-align'>{wholesaler.Company}</td>
                                <td className='table-vertical-align'>{wholesaler.City}</td>
                                <td className='table-vertical-align'>{wholesaler.Country}</td>
                                <td className='table-vertical-align'>{new Date(wholesaler.created_at * 1000).toLocaleDateString()}</td>
                                <td className='table-vertical-align'>
                                    <Link className='btn btn-sm btn-info col' to={`/dashboard/wholesalers/open/${wholesaler.id}`}>{open}</Link>
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
                    <td className='table-vertical-align' colSpan={6}>
                        <Paginator
                            goToPage={this.goToPage}
                            linkList='dashboard/wholesalers'
                            margin={3}
                            numberOfItemsPerPage={this.state.itemsPerPage}
                            countOfItems={this.props.count}
                            page={Number(this.props.match.params.page) || 1} />
                    </td>
                </tr>
                </tfoot>
            ]
        }

        return (
            <Row>
                <Col id='list-of-rma'>
                    {!this.state.isFetchingData && <Spinner headTagId='list-of-rma' />}

                    <Card>
                        <CardHeader className='text-center'>{wholesalers}</CardHeader>
                        <CardBody>
                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th className='table-vertical-align'>
                                            <Button className='col' size='sm' onClick={this.search} color='info'>{search}</Button>
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.vat}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, vat: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.email}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, email: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.company}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, company: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.city}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, city: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.country}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, country: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.created_at}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, created_at: e.target.value } })} />
                                        </th>
                                        <th />
                                    </tr>
                                    <tr>
                                        <th className='table-vertical-align text-center sort-column-th' onClick={() => this.sort('is_disabled')}>
                                            {active} &nbsp;
                                            {(!this.state.sort.is_disabled || this.state.sort.is_disabled === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.is_disabled && this.state.sort.is_disabled === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('vat')}>
                                            {vat} &nbsp;
                                            {(!this.state.sort.vat || this.state.sort.vat === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.vat && this.state.sort.vat === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('email')}>
                                            {email} &nbsp;
                                            {(!this.state.sort.email || this.state.sort.email === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.email && this.state.sort.email === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('company')}>
                                            {company} &nbsp;
                                            {(!this.state.sort.company || this.state.sort.company === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.company && this.state.sort.company === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('city')}>
                                            {city} &nbsp;
                                            {(!this.state.sort.city || this.state.sort.city === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.city && this.state.sort.city === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('country')}>
                                            {country} &nbsp;
                                            {(!this.state.sort.country || this.state.sort.country === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.country && this.state.sort.country === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('created_at')}>
                                            {createDate} &nbsp;
                                            {(!this.state.sort.created_at || this.state.sort.created_at === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.created_at && this.state.sort.created_at === 'asc') && <i className='fa fa-sort-up fa-lg' />}
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
        )
    }
}

export default List;

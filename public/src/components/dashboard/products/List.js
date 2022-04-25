import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Table, Card, CardBody, CardHeader, Input, Button, Label, ButtonGroup } from 'reactstrap';
import { SUB_DOMAIN } from '../../../../../public/src/utils/common';

import Paginator from '../../elements/paginator';
import Spinner from '../../../../../public/src/components/elements/spinner/index';

import { getLanguageResources } from "../../../../../public/src/utils/language";

class ListOfProducts extends React.Component {
    constructor (props) {
        super(props);

        this.baseSort = {
            image: '',
            ItemNo: '',
            Name: '',
            Groupitem: '',
            Groupitem2: ''
        };

        this.state = {
            isFetchingData: false,
            itemsPerPage: Number(this.props.items) || 10,
            search: {
                ItemNo: '',
                Name: '',
                Groupitem: '',
                Groupitem2: ''
            },
            sort: this.baseSort
        };

        this.sort = this.sort.bind(this);
        this.search = this.search.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.searchEnterClick = this.searchEnterClick.bind(this);
    }

    componentDidMount () {
        this.props.getAllCategories(() => this.setState({ isFetchingData: true }), this.props.match.params.page || 1, this.state.itemsPerPage);
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

            if (search.ItemNo || search.Name || search.Groupitem || search.Groupitem2 || sort.image || sort.ItemNo || sort.Name || sort.Groupitem || sort.Groupitem2) {
                this.props.search(() => this.setState({ isFetchingData: true }), search, sort, page, this.state.itemsPerPage);
            } else {
                this.props.getAllCategories(() => this.setState({ isFetchingData: true }), page, this.state.itemsPerPage);
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

    goToPage (newPage) {
        this.props.history.push(`/dashboard/products/${newPage}`);
    }

    render () {
        const { labels: { picture, name, number, socket, category, action }, titles: { categoryItems }, buttons: { search } } = getLanguageResources();

        let content = null;
        if (this.props.products) {
            content = [
                <tbody key='body'>
                    {this.props.products.map((category, i) => {
                        return (
                            <tr key={i}>
                                <td className='table-vertical-align'>{category.ItemNo}</td>
                                <td className='table-vertical-align'>{category.Name}</td>
                                <td className='table-vertical-align'>{category.Groupitem}</td>
                                <td className='table-vertical-align'>{category.Groupitem2}</td>
                                <td className='table-vertical-align text-center' style={{ width: '12%' }}>
                                    <img className={'img-fluid'} src={`${SUB_DOMAIN}/build/images/category/${category.Groupitem}/${category.Name.replace(/[\/\\:*"<>|]/g, '')}.png`} height={96} />
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
                        <td className='table-vertical-align' colSpan={5}>
                            <Paginator
                                goToPage={this.goToPage}
                                linkList='dashboard/products'
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
                <Col id='list-of-category-products'>
                    {!this.state.isFetchingData && <Spinner headTagId='list-of-category-products' />}

                    <Card>
                        <CardHeader className='text-center'>{categoryItems}</CardHeader>
                        <CardBody>
                            <Table responsive bordered>
                                <thead>
                                    <tr>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.ItemNo}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, ItemNo: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.Name}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, Name: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.Groupitem}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, Groupitem: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align'>
                                            <Input
                                                value={this.state.search.Groupitem2}
                                                onKeyPress={(e) => this.searchEnterClick(e)}
                                                onChange={(e) => this.setState({ search: { ...this.state.search, Groupitem2: e.target.value } })} />
                                        </th>
                                        <th className='table-vertical-align text-center' colSpan={2}>
                                            <Button color='info' size='sm' className='col' onClick={this.search}>{search}</Button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('ItemNo')}>
                                            {number} &nbsp;
                                            {(!this.state.sort.ItemNo || this.state.sort.ItemNo === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.ItemNo && this.state.sort.ItemNo === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('Name')}>
                                            {name} &nbsp;
                                            {(!this.state.sort.Name || this.state.sort.Name === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.Name && this.state.sort.Name === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('Groupitem')}>
                                            {category} &nbsp;
                                            {(!this.state.sort.Groupitem || this.state.sort.Groupitem === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.Groupitem && this.state.sort.Groupitem === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th' onClick={() => this.sort('Groupitem2')}>
                                            {socket} &nbsp;
                                            {(!this.state.sort.Groupitem2 || this.state.sort.Groupitem2 === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.Groupitem2 && this.state.sort.Groupitem2 === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        <th className='table-vertical-align sort-column-th text-center' onClick={() => this.sort('image')}>
                                            {picture} &nbsp;
                                            {(!this.state.sort.image || this.state.sort.image === 'desc') && <i className='fa fa-sort-down fa-lg' />}
                                            {(this.state.sort.image && this.state.sort.image === 'asc') && <i className='fa fa-sort-up fa-lg' />}
                                        </th>
                                        {/*<th className='table-vertical-align text-center'>{action}</th>*/}
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

export default ListOfProducts;

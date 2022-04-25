import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';

import PageItem from './page-item';

import './react-simple-paginator.css';

/**
 * Show the pagination for the list of elements
 */
class Paginator extends React.Component {
    constructor (props) {
        super(props);

        const allPages = parseInt(this.props.countOfItems / this.props.numberOfItemsPerPage + 0.99, 10);

        this.state = {
            /**
             * First showed page on pagination list of pages (5,6,7,8,9) is 5
             */
            firstShowedPage: Number(this.props.page) - this.props.margin,
            /**
             * On which page the user is now
             */
            activePage: Number(this.props.page),
            /**
             * Last showed page on pagination list of pages (5,6,7,8,9) is 9
             */
            lastShowedPage: Number(this.props.page) + this.props.margin,
            /**
             * How many pages we have for that collection
             */
            allPages,
            /**
             * Page which user is enter manually and is go to that page
             */
            goPage: this.props.page,
        };

        this.generateThePaginatorStates = this.generateThePaginatorStates.bind(this);
        this.goToPageKeyPress = this.goToPageKeyPress.bind(this);
    }

    componentWillReceiveProps (newProps) {
        if (newProps === undefined) return;

        const page = Number(newProps.page);

        // Change the content of the Paginator if countOfItems, activePage, numberOfItemsPerPage is changed
        // Then need to refresh the Paginator
        if (newProps.countOfItems !== this.props.countOfItems ||
            Number(this.state.activePage) !== page ||
            newProps.numberOfItemsPerPage !== Number(this.props.numberOfItemsPerPage)) {
            const allPages = parseInt(newProps.countOfItems / newProps.numberOfItemsPerPage + 0.99, 10);
            this.setState({ allPages });
            this.generateThePaginatorStates(page, allPages);
        }
    }

    componentDidMount () {
        this.generateThePaginatorStates(this.props.page || 1, this.state.allPages);
    }

    /**
     * Generate thew new state of Paginator after change the page
     * @param {Number} activePage Which page now is showed
     * @param {Number} allPages All pages which is show for that collection
     */
    generateThePaginatorStates (activePage, allPages) {
        const { margin } = this.props;

        this.setState({
            activePage,
            firstShowedPage: activePage - margin > 1 ? activePage - margin : 1,
            lastShowedPage: activePage + margin < allPages ? activePage + margin : allPages
        });
    }

    /**
     * Pres enter go to wrote page on the box
     * @param {Object} event Some event object
     */
    goToPageKeyPress (event) {
        if (event.key === 'Enter') {
            this.props.goToPage(this.state.goPage)
        }
    }

    render () {
        const pages = [];

        pages.push(
            <PageItem
                key={'First'}
                classes={Number(this.state.activePage) === 1 ? 'disabled' : ''}
                link={`/${this.props.linkList}/1`}
                title='First' />
        );

        for (let i = this.state.firstShowedPage; i <= this.state.lastShowedPage; i++) {
            pages.push(
                <PageItem
                    key={i}
                    classes={Number(this.state.activePage) === i && 'active'}
                    link={`/${this.props.linkList}/${i}`}
                    title={i.toString()} />
            );
        }

        pages.push(
            <PageItem
                key={'Last'}
                classes={Number(this.state.activePage) === Number(this.state.allPages) && 'disabled'}
                link={`/${this.props.linkList}/${this.state.allPages}`}
                title='Last' />
        );

        return (
            <Pagination key='pagination' className='react-simple-paginator'>
                {pages}

                {/* Show the Input field where user can manually set to which page want to go */}
                <li>
                    <InputGroup>
                        <Input
                            className={'go-to-page-input'}
                            value={`${this.state.goPage}`}
                            onKeyPress={(e) => this.goToPageKeyPress(e)}
                            onChange={e => this.setState({ goPage: e.target.value })} />

                        <InputGroupAddon addonType="prepend">
                            <Button
                                className={'go-to-page-btn'}
                                size={'sm'}
                                onClick={() => this.props.goToPage(this.state.goPage)}>
                                GO / Pages: ({this.props.countOfItems}) / ({this.state.allPages})
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </li>
            </Pagination>
        );
    }
}

Paginator.propTypes = {
    /**
     * Url to which is going that page. Example `users/all/${page}`
     */
    linkList: PropTypes.string.isRequired,
    /**
     * How many Page Items will show before and after current page
     */
    margin: PropTypes.number.isRequired,
    /**
     * How many items will show on one page
     */
    numberOfItemsPerPage: PropTypes.number.isRequired,
    /**
     * How many items we have on that collection
     */
    countOfItems: PropTypes.number.isRequired,
    /**
     * Function which user can directly go to that page
     */
    goToPage: PropTypes.func.isRequired,
    /**
     * Current page
     */
    page: PropTypes.number.isRequired
};

export default Paginator;

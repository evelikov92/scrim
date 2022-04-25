import React from 'react'
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import './sidebar.css';

import Sidebar from '../Sidebar';

/**
 * Component which is for Layout of the dashboard pages
 */
const Layout = (props) => {
    return (
        <Col className='layout'>
            <Row>
                <Col className={`sidebar-context ${props.className}`}  lg={2}>
                    <Sidebar
                        url={props.content.props.match.url}
                        title={props.sidebarTitle}
                        items={props.items} />
                </Col>

                <Col className='warranty-content' lg={10}>{props.content}</Col>
            </Row>
        </Col>
    )
};

Layout.propTypes = {
    /**
     * Classes add for sidebar content
     */
    className: PropTypes.string,
    /**
     * Sidebar title
     */
    sidebarTitle: PropTypes.string,
    /**
     * Sidebar menu items
     */
    items: PropTypes.array.isRequired
};

export default Layout;

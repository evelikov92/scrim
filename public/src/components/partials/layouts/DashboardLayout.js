import React from 'react'
import PropTypes from 'prop-types';
import { getLanguageResources } from '../../../../../public/src/utils/language';
import Layout from './Layout';

/**
 * Component for layout for dashboard pages
 * @param {Object} props object with the logged user
 */
const DashboardLayout = (props) => {
    if (props.user.group !== '1' && props.user.group !== '2') {
        return null;
    }

    const strings = getLanguageResources('dashboardSidebar');
    const items = [
        { title: strings.rma, link: '/dashboard/rma' },
        { title: 'Notifications', link: '/dashboard/notifications' },
        { title: 'Client Emails', link: '/dashboard/client-emails' },
        { title: 'Feedback', link: '/dashboard/feedback' },
        { title: strings.products, link: '/dashboard/products' },
        { title: strings.wholesalers, link: '/dashboard/wholesalers' },
        { title: strings.users, link: '/dashboard/users' },
        { title: strings.warranty, link: '/dashboard/warranty' },
        { title: strings.templates, link: '/dashboard/templates' },
        { title: strings.languages, link: '/dashboard/languages' }
    ];

    return (
        <Layout
            className='warranty-sidebar'
            sidebarTitle='Dashboard'
            content={props.children}
            items={items} />
    )
};

DashboardLayout.propTypes = {
    /**
     * Logged user
     */
    user: PropTypes.object
};

export default DashboardLayout;

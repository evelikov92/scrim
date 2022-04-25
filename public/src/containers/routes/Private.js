import React from 'react'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'

const Private = ({component: Component, condition, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (condition) return <Component {...props} />;
                return <Redirect to='/account/login' />;
            }} />
    )
};

export default Private;

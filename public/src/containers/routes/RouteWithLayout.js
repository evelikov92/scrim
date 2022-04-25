import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

export const RouteWithLayout = ({ layout, component: Component, condition, ...rest }) => {
    if (condition && !condition()) {
        return <Redirect to='/account/login' />
    }

    return (
        <Route {...rest}
            render={props => {
                    return React.createElement(layout, { ...rest, ...props },
                        React.createElement(Component, props));
            }}
        />
    );
};

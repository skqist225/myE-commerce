import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...restProps }) {
    const { isAuthenticated, loading } = useSelector(state => state.auth);

    return (
        <>
            {loading === false && (
                <Route
                    {...restProps}
                    render={props => {
                        if (!isAuthenticated) {
                            return <Redirect to="/login" />;
                        }

                        return <Component {...props} />;
                    }}
                />
            )}
        </>
    );
}

export default ProtectedRoute;

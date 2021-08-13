import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...restProps }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    console.log(isAuthenticated);
    console.log(user);

    if (user.role !== 'admin' || !isAuthenticated) {
        localStorage.removeItem('user');
        return <Redirect to="/login" />;
    }

    return (
        <>
            {loading === false && (
                <Route
                    {...restProps}
                    render={props => {
                        return <Component {...props} />;
                    }}
                />
            )}
        </>
    );
}

export default ProtectedRoute;

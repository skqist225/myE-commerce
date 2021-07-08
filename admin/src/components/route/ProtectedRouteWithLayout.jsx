import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRouteWithLayout({ parent: Parent, component: Component, ...restProps }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    return (
        <>
            <Parent>
                {loading === false && (
                    <Route
                        {...restProps}
                        render={props => {
                            if (!isAuthenticated || user.role !== 'admin') {
                                return <Redirect to="/login" />;
                            }

                            return <Component {...props} />;
                        }}
                    />
                )}
            </Parent>
        </>
    );
}

export default ProtectedRouteWithLayout;

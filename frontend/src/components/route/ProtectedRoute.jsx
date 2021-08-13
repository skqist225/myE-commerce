import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { updateUserLoggedOut } from '../../features/auth';

function ProtectedRoute({ component: Component, ...restProps }) {
    const cookies = new Cookies();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cookies.get('token')) {
            localStorage.removeItem('user');
            dispatch(updateUserLoggedOut());
        }
    }, [cookies]);

    const { isAuthenticated, loading } = useSelector(state => state.auth);

    return (
        <>
            {!loading && (
                <Route
                    {...restProps}
                    render={props => {
                        if (!isAuthenticated) {
                            return <Redirect to="/buyer/login" />;
                        }

                        return <Component {...props} />;
                    }}
                />
            )}
        </>
    );
}

export default ProtectedRoute;

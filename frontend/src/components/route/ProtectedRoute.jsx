import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { updateUserLoggedOut } from '../../features/auth';

function ProtectedRoute({ component: Component, ...restProps }) {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(updateUserLoggedOut());
    // }, []);

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

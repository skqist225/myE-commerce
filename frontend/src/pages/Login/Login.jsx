import React from 'react';
import { LoginHeader, LoginBody, Footer } from '../../components';

function Login({ match }) {
    console.log(match.url);

    return (
        <div style={{ position: 'relative' }}>
            <LoginHeader />
            <LoginBody />
            <Footer />
            <p>true</p>
        </div>
    );
}

export default Login;

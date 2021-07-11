import React from 'react';

import { Header, Body } from '../../components';

function Home() {
    console.log('Home rendering...');

    return (
        <div className="home">
            <Header padding="15px 15px" />
            <Body></Body>
        </div>
    );
}

export default Home;

import React from 'react';
import { Header } from '../../components';

import ViewShop from '../../components/shopList/ViewShop';

function Shop({ match }) {
    return (
        <>
            <Header bgColor="#d0011b" />
            <ViewShop match={match} />
        </>
    );
}

export default Shop;

import React from 'react';
import { Header, ShopProducts } from '../../components';

function SPs({ match }) {
    return (
        <>
            <Header bgColor="#d0011b" noBelowSeachForm={true} secondLogo={true} />
            <ShopProducts match={match} />
        </>
    );
}

export default SPs;

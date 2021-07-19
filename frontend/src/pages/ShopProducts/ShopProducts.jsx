import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, ShopProducts } from '../../components';
import { fetchShopById } from '../../features/shop/shopSlice';
import { fetchTransporters } from '../../features/transporters';

function SPs({ match }) {
    // const dispatch = useDispatch();

    return (
        <>
            <Header bgColor="#d0011b" noBelowSeachForm={true} secondLogo={true} match={match} />
            <ShopProducts match={match} />
        </>
    );
}

export default SPs;

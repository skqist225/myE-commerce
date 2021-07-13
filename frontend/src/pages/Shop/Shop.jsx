import React from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../../components';

import ViewShop from '../../components/shopList/ViewShop';
import { fetchSingleShop } from '../../features/shop/shopSlice';

function Shop({ match }) {
    const { shopName } = match.params;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchSingleShop(shopName));
    }, [dispatch, shopName]);

    return (
        <>
            <Header bgColor="#d0011b" />
            <ViewShop match={match} />
        </>
    );
}

export default Shop;

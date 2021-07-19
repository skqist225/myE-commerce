import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses, userAddressesSelector } from '../../features/userAddresses';

import { Header } from '../../components';
import { PageBodyContainer, ContentContainer } from '../../globalStyle';
import { ViewCheckout } from '../../components';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userAddresses = useSelector(userAddressesSelector.selectAll);

    const selectedProductInCart = localStorage.getItem('cart');

    useEffect(() => {
        if (selectedProductInCart === null) {
            history.push('/');
        }
    }, []);

    React.useEffect(() => {
        dispatch(fetchUserAddresses());
    }, [dispatch]);

    return (
        <>
            <Header></Header>
            <PageBodyContainer backgroundColor="#f5f5f5" style={{ height: '300vh' }}>
                <ContentContainer>
                    {userAddresses.length > 0 && <ViewCheckout userAddresses={userAddresses} />}
                </ContentContainer>
            </PageBodyContainer>
        </>
    );
};

export default Checkout;

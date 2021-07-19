import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, User } from '../../components';
import { fetchUserOrders } from '../../features/orders/ordersSlice';
import { PageBodyContainer, ContentContainer } from '../../globalStyle';

function Personal() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    return (
        <>
            <Header />
            <PageBodyContainer backgroundColor="#f5f5f5" pt="2rem">
                <ContentContainer>
                    <User />
                </ContentContainer>
            </PageBodyContainer>
        </>
    );
}

export default Personal;

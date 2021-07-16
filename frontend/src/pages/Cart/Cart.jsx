import React from 'react';
import { Header } from '../../components';
import { ContentContainer, PageBodyContainer } from '../../globalStyle';
import { ViewCart } from '../../components';

function Cart() {
    return (
        <>
            <Header></Header>
            <PageBodyContainer backgroundColor="#f5f5f5">
                <ContentContainer>
                    <ViewCart />
                </ContentContainer>
            </PageBodyContainer>
        </>
    );
}

export default Cart;

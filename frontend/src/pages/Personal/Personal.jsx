import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header, User, LeftMenu, Purchase } from '../../components';
import { PageBodyContainer, ContentContainer, Flex } from '../../globalStyle';

function Personal({ match }) {
    const { url } = match;
    const dispatch = useDispatch();

    console.log(match.url);

    return (
        <>
            <Header />
            <PageBodyContainer backgroundColor="#f5f5f5" pt="2rem">
                <ContentContainer height="300rem">
                    <Flex alignItems="flex-start">
                        <LeftMenu />
                        {url === '/user/account/profile' && <User />}
                        {url === '/user/purchase' && <Purchase url={url} match={match} />}
                    </Flex>
                </ContentContainer>
            </PageBodyContainer>
        </>
    );
}

export default Personal;

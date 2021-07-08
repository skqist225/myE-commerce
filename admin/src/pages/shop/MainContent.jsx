import React from 'react';

import styled from 'styled-components';
import AllOrder from './AllOrder';

export const MainContentContainer = styled.main`
    position: absolute;
    top: 56px;
    left: 0;
    background-color: #f6f6f6;
    flex: 1;
    margin-left: 220px;
    height: calc(100vh - 56px);
    width: 100%;
`;

function MainContent({ children }) {
    return (
        <MainContentContainer>
            {console.log('start:', performance.now())}
            {Array.from({ length: 100000 }).map((val, index) => (
                <span key={index}>💖</span>
            ))}
            {console.log('end:', performance.now())}
        </MainContentContainer>
    );
}

export default MainContent;

import React from 'react';
import { Button, ButtonIconWrapper } from './TopBarComponent';
import { ProtectedRoute } from '../../components';
import { Switch } from 'react-router-dom';
import { AddIcon } from './icon';
import TopBar from './TopBar';
import SideBar from './SideBar';
import MainContent from './MainContent';
import styled from 'styled-components';
import './saleChannel.css';
import AllOrder from './AllOrder';

const Body = styled.div`
    display: flex;
    position: relative;
    width: 100%;
`;

function ShopManage({ match }) {
    console.log(match.url);

    return (
        <div>
            <TopBar />
            <Body style={{ display: 'flex' }}>
                <SideBar />
                <MainContent>
                    <Switch>
                        <ProtectedRoute
                            path={`${match.url}/sale/order`}
                            component={AllOrder}
                            exact={true}
                        />
                    </Switch>
                </MainContent>
            </Body>
            {/* <Button
                render={
                    <>
                        <ButtonIconWrapper>
                            <AddIcon fillColor="#fff" />
                        </ButtonIconWrapper>
                        <span>Thêm 1 sản phẩm mới</span>
                    </>
                }
            />
            <Button
                color="#000"
                backgroundColor="#fff"
                borderColor="#e5e5e5"
                render={
                    <>
                        <span>Công cụ xử lí hàng loạt</span>
                        <ButtonIconWrapper end>
                            <AddIcon fillColor="#000" />
                        </ButtonIconWrapper>
                    </>
                }
            /> */}
        </div>
    );
}

export default ShopManage;

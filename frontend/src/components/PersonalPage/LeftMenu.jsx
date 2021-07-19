import React from 'react';
import {
    MenuDetail,
    DetailFunc,
    MenuTitle,
    MenuIcon,
    FlexAlignStart,
    LeftMenuContainer,
    Username,
} from './LeftMenuComponent';
import { Flex } from '../../globalStyle';
import { Link } from 'react-router-dom';
import { createImage } from '../../helpers';
import { EditIcon } from '../shopList/svgIcon';
import { useSelector } from 'react-redux';

function LeftMenu() {
    const { user } = useSelector(state => state.auth);

    function hideSubMenu() {
        const menuDetails = document.getElementsByClassName('menuDetail');
        for (let menuDetail of menuDetails) {
            menuDetail.style.display = 'none';
        }
    }

    function turnOnSubMenu(flag) {
        const menuDetails = document.getElementsByClassName('menuDetail');
        menuDetails[flag === 0 ? 0 : 1].style.display = 'block';
        menuDetails[flag === 0 ? 1 : 0].style.display = 'none';
    }

    return (
        <LeftMenuContainer>
            <Flex padding="1.5rem 0">
                <img
                    alt=""
                    src={createImage(user.avatar, false)}
                    style={{
                        width: '4.75rem',
                        height: '4.75rem',
                        borderRadius: '50%',
                    }}
                />
                <Flex
                    className="username"
                    flexDirection="column"
                    alignItems="flex-start"
                    style={{ paddingLeft: '1.5rem' }}
                >
                    <Username>{user.username}</Username>
                    <div style={{ fontSize: '1.8rem' }}>
                        <EditIcon />
                        Sửa hồ sơ
                    </div>
                </Flex>
            </Flex>
            <Flex flexDirection="column" width="19rem" style={{ marginRight: '0' }}>
                <FlexAlignStart>
                    <MenuIcon src={createImage('TKCT.png')} alt="" />
                    <Flex flexDirection="column" width="100%">
                        <MenuTitle onClick={() => turnOnSubMenu(0)}>Tài Khoản Của Tôi</MenuTitle>

                        <MenuDetail>
                            <DetailFunc>
                                <Link to="/user/account/profile">Hồ Sơ </Link>
                            </DetailFunc>
                            <DetailFunc>Ngân Hàng</DetailFunc>
                            <DetailFunc>Địa chỉ</DetailFunc>
                            <DetailFunc>Đổi mật khẩu</DetailFunc>
                        </MenuDetail>
                    </Flex>
                </FlexAlignStart>
                <FlexAlignStart>
                    <MenuIcon src={createImage('DM.png')} alt="" />
                    <Link to="/user/purchase" style={{ color: 'inherit' }}>
                        <MenuTitle onClick={() => hideSubMenu()}>Đơn Mua</MenuTitle>
                    </Link>
                </FlexAlignStart>
                <FlexAlignStart>
                    <MenuIcon src={createImage('TB.png')} alt="" />

                    <Flex flexDirection="column" alignItems="flex-start">
                        <MenuTitle onClick={() => turnOnSubMenu(1)}>Thông Báo</MenuTitle>
                        <MenuDetail>
                            <DetailFunc>Cập Nhật Đơn Hàng</DetailFunc>
                            <DetailFunc>Khuyến Mãi</DetailFunc>
                            <DetailFunc>Cập Nhật Ví</DetailFunc>
                            <DetailFunc>Cập Nhật Đánh Giá</DetailFunc>
                            <DetailFunc>Cập Nhật Shopee</DetailFunc>
                        </MenuDetail>
                    </Flex>
                </FlexAlignStart>
                <FlexAlignStart>
                    <MenuIcon src={createImage('KV.png')} alt="" />
                    <MenuTitle onClick={() => hideSubMenu()}>Kho Voucher</MenuTitle>
                </FlexAlignStart>
                <FlexAlignStart>
                    <MenuIcon src={createImage('SX.png')} alt="" />
                    <MenuTitle onClick={() => hideSubMenu()}>Shopee Xu</MenuTitle>
                </FlexAlignStart>
            </Flex>
        </LeftMenuContainer>
    );
}

export default LeftMenu;

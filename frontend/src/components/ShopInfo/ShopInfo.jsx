import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContentContainer, WhiteBgWrapper, Flex } from '../../globalStyle';
import {
    ShopInfoSection,
    ShopName,
    ActiveTime,
    ChatButton,
    ViewShopButton,
    InfoTitle,
    InfoNumber,
    ShopLogo,
} from './ShopInfoComponent';
import { createImage } from '../../helpers';
import { ViewShopMallLogo } from '../shopList/ShopProductsComponent';
import { ProductIcon, ChatIcon2 } from '../shopList/svgIcon';

function ShopInfo({ bgColor }) {
    const { productEntity, loading, successMessage } = useSelector(state => state.product);

    const { shop, number_of_products } = productEntity;

    return (
        <ShopInfoSection>
            <ContentContainer>
                <WhiteBgWrapper padding="3.125rem">
                    {!loading && successMessage && (
                        <Flex width="100%">
                            <Flex alignItems="none" height="100%" style={{ position: 'relative' }}>
                                <Flex
                                    style={{ position: 'relative' }}
                                    width="10rem"
                                    style={{ marginRight: '2.5rem' }}
                                >
                                    <ShopLogo src={createImage(shop.shopLogo, false)}>
                                        <ViewShopMallLogo
                                            src={createImage('SM.png')}
                                            alt=""
                                            className="viewShopSM"
                                            style={{ left: '1.8rem', top: '82%' }}
                                        />
                                    </ShopLogo>
                                </Flex>

                                <Flex
                                    flexDirection="column"
                                    width="28rem"
                                    height="9rem"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                >
                                    <ShopName>{shop.shopName}</ShopName>
                                    <ActiveTime>"Online 34 phút trước"</ActiveTime>
                                    <Flex>
                                        <ChatButton bgColor={bgColor}>
                                            <ChatIcon2
                                                width="1.4rem"
                                                height="1.4rem"
                                                fill={bgColor}
                                            />
                                            <span>Chat Ngay</span>
                                        </ChatButton>
                                        <ViewShopButton>
                                            <ProductIcon width="1.4rem" height="1.4rem" />
                                            <span>Xem Shop</span>
                                        </ViewShopButton>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                padding=" 0 0 0 6.875rem"
                                height="9rem"
                                width="100%"
                                justifyContent="space-between"
                            >
                                <Flex
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                    height="100%"
                                    style={{ marginRight: '6.25rem' }}
                                >
                                    <Flex height="4.2rem">
                                        <InfoTitle>Đánh giá</InfoTitle>
                                        <InfoNumber color={bgColor}>12,4k</InfoNumber>
                                    </Flex>
                                    <Flex height="4.2rem">
                                        <InfoTitle>Sản phẩm</InfoTitle>
                                        <InfoNumber color={bgColor}>
                                            {number_of_products}
                                        </InfoNumber>
                                    </Flex>
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                    height="100%"
                                    style={{ marginRight: '6.25rem' }}
                                >
                                    <Flex height="4.2rem">
                                        <InfoTitle>Tỉ lệ phản hồi</InfoTitle>
                                        <InfoNumber color={bgColor}>100%</InfoNumber>
                                    </Flex>
                                    <Flex height="4.2rem">
                                        <InfoTitle>Thời Gian Phản Hồi</InfoTitle>
                                        <InfoNumber color={bgColor}>trong vài giờ</InfoNumber>
                                    </Flex>
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                    height="100%"
                                >
                                    <Flex height="4.2rem">
                                        <InfoTitle>Tham Gia</InfoTitle>
                                        <InfoNumber color={bgColor}>34 tháng trước</InfoNumber>
                                    </Flex>
                                    <Flex height="4.2rem">
                                        <InfoTitle>Người Theo Dõi</InfoTitle>
                                        <InfoNumber color={bgColor}>203k</InfoNumber>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </WhiteBgWrapper>
            </ContentContainer>
        </ShopInfoSection>
    );
}

export default ShopInfo;

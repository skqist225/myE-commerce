import React, { memo } from 'react';
import { Flex } from '../../globalStyle';
import { createImage, separateNumberWithDot } from '../../helpers';
import styled from 'styled-components';

const OriginalPrice = styled.div`
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.87);
    text-decoration: line-through;
    margin-right: 4px;
    color: #000;
    opacity: 0.26;
    overflow: hidden;
    text-overflow: ellipsis;

    &:before {
        content: 'đ';
    }
`;

const FinalPrice = styled.div`
    font-size: 1.4rem;
    color: #ee4d2d;

    &:before {
        content: 'đ';
    }
`;

const CustomFlex = styled(Flex)`
    &:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    }
`;

function OrderDetail({ order: { products } }) {
    console.log('order detail rendering');

    return (
        <Flex flexDirection="column" style={{ paddingTop: '1.2rem' }}>
            {products.map(({ product, quantity }) => (
                <CustomFlex
                    width="100%"
                    height="10rem"
                    style={{ borderTop: '1px solid rgba(0, 0, 0, 0.09)' }}
                >
                    <img
                        src={createImage(product.productTypes.typeImage, false)}
                        style={{ width: '8rem', height: '8rem' }}
                    />
                    <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        style={{ paddingLeft: '1.2rem' }}
                        width="78%"
                    >
                        <div
                            style={{
                                fontSize: '1.6rem',
                                lineHeight: '2.2rem',
                                marginBottom: '.5rem',
                            }}
                        >
                            {product.productName}
                        </div>
                        {product.productTypes && (
                            <div
                                style={{
                                    color: ' rgba(0,0,0,.54)',
                                    fontSize: '1.75rem',
                                    marginBottom: '.5rem',
                                }}
                            >
                                Phân loại hàng: {product.productTypes.typeName}
                            </div>
                        )}
                        <div
                            style={{
                                fontSize: '1.6rem',
                                lineHeight: '2.2rem',
                                marginBottom: '.5rem',
                            }}
                        >
                            x {quantity}
                        </div>
                    </Flex>
                    <Flex justifyContent="flex-end" width="20%">
                        {product.discountPercent > 0 && (
                            <OriginalPrice>
                                {separateNumberWithDot(product.productTypes.typePrice)}
                            </OriginalPrice>
                        )}
                        <FinalPrice>
                            {separateNumberWithDot(
                                product.productTypes.typePrice -
                                    (product.productTypes.typePrice * product.discountPercent) / 100
                            )}
                        </FinalPrice>
                    </Flex>
                </CustomFlex>
            ))}
        </Flex>
    );
}

export default memo(OrderDetail);

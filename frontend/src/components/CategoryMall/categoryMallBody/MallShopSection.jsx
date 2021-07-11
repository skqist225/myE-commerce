import React, { useContext } from 'react';

import {
    MallShopContainer,
    MSTitle,
    MSBrandLogo,
    ShopLogo,
    AnchorExtend,
} from './MallShopComponent';
import { ArrowRight } from './categoryMallIcon.js';
import slugify from 'slugify';

import { MallShopsContext } from '../../../pages/CategoryMall/CategoryMall';
import { createImage } from '../../../helpers';

function MallShopSection() {
    const { mallShops, shopCategory } = useContext(MallShopsContext);

    const viewAllLink = shopCategory.substring(shopCategory.indexOf('.') + 1);

    console.log(mallShops);

    return (
        <MallShopContainer>
            <MSTitle>
                <AnchorExtend
                    color="#d0011b"
                    fontWeight="500"
                    fontSize="2.125rem"
                    to={`/mall/${shopCategory}`}
                >
                    SHOPEE MALL
                </AnchorExtend>

                <AnchorExtend
                    color="#d0011b"
                    fontWeight="500"
                    fontSize="1.8rem"
                    className="flex"
                    to={`/mall/brands/${viewAllLink}`}
                >
                    <div>Xem tất cả</div>
                    <div>
                        <ArrowRight fillColor="#d0011b" width="1.8rem" height="1.8rem" />
                    </div>
                </AnchorExtend>
            </MSTitle>
            <MSBrandLogo>
                {mallShops.map(shop => (
                    <AnchorExtend
                        to={`/shop/${slugify(shop.shopName, { replacement: '_', lower: true })}`}
                        key={shop._id}
                    >
                        <ShopLogo src={createImage(shop.shopLogo, false)} alt="" />
                    </AnchorExtend>
                ))}
            </MSBrandLogo>
        </MallShopContainer>
    );
}

export default MallShopSection;

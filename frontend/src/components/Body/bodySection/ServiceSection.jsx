import React from 'react';
import { ContentContainer } from '../../../globalStyle';

import {
    Section,
    ImageStuffContainer,
    ImageWrapper,
    Image,
    ServiceStuffContainer,
    ServiceWrapper,
    ServiceImg,
    ServiceTitle,
    Anchor,
} from './serviceSectionComponent';
import { Slider } from '../../../components';
import { createImage } from '../../../helpers';

function ServiceSection() {
    const serviceTitleArr = [
        'Tech Zone - Siêu Thị Điện Tử',
        'Ở Nhà Không Khó',
        'Gì Cũng Rẻ - Từ 1K',
        'Freeship Xtra',
        'Nạp Thẻ, Dịch Vụ & Phim',
        'Shopee Số Gì Đây',
        'Hoàn Xu 15% Mỗi Ngày',
        'Hàng Hiệu -50%',
        'Hàng Quốc Tế - Thương Hiệu',
        'Shopee Premium',
    ];
    let services = Array.from({ length: 10 }).map((value, index) => ({
        title: serviceTitleArr[index],
        path: createImage(`homeservice/${index + 1}.png`),
    }));

    return (
        <Section>
            <ContentContainer>
                <ImageStuffContainer>
                    <Slider
                        dataSlider={Array.from({ length: 13 }).map(
                            (value, index) => `homeslider/${index + 1}.png`
                        )}
                        withoutSubPath={true}
                        height="23.5rem"
                    />
                    <ImageWrapper>
                        <Image src={createImage('homeslider/15.png')} />
                        <Image src={createImage('homeslider/14.png')} />
                    </ImageWrapper>
                </ImageStuffContainer>
                <ServiceStuffContainer>
                    {services.map(({ path, title }) => (
                        <Anchor to="/" key={title}>
                            {' '}
                            <ServiceWrapper>
                                <ImageWrapper>
                                    <ServiceImg src={path} />
                                </ImageWrapper>
                                <ServiceTitle title={title} />
                            </ServiceWrapper>
                        </Anchor>
                    ))}
                </ServiceStuffContainer>
            </ContentContainer>
        </Section>
    );
}

export default ServiceSection;

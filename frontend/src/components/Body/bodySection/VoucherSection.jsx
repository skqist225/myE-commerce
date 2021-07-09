import React from 'react';
import { ContentContainer, GridLayout } from '../../../globalStyle';
import { VoucherContainer, VoucherImage } from './voucherComponent';
import { WhiteBgWrapper } from './categoriesComponent';
import { createImage } from '../../../helpers';

function VoucherSection() {
    return (
        <VoucherContainer>
            <ContentContainer>
                <GridLayout templatecolumn="repeat(3, 1fr)">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <VoucherImage
                            src={createImage(`homevoucher/${index + 1}.jpeg`)}
                            key={index}
                        />
                    ))}
                </GridLayout>
            </ContentContainer>
        </VoucherContainer>
    );
}

export default VoucherSection;

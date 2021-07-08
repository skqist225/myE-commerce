import React from 'react';
import { ContentContainer } from '../../../globalStyle';
import { Section, ImageStuffContainer } from './ServiceSectionComponent';
import { Slider } from '../../../components';

function ServiceSection() {
    return (
        <Section>
            <ContentContainer>
                <ImageStuffContainer>
                    <Slider />
                    <div>
                        <img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </ImageStuffContainer>
            </ContentContainer>
        </Section>
    );
}

export default ServiceSection;

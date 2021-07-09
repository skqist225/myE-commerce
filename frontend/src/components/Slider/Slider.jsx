import React, { memo, useState } from 'react';
import BtnSlider from './BtnSlider';
import PropTypes from 'prop-types';
import { createImage, useInterval } from '../../helpers';
import styled from 'styled-components';
import './shopSlider.css';

const ContainerSlider = styled.div`
    width: 100%;
    height: ${props => (props.height ? props.height : '600px')};
    position: relative;
    overflow: hidden;
    box-shadow: ${props => (props.haveBoxShadow ? '0 10px 20px rgba(0, 0, 0, 0.2)' : '0')}
    border-radius: 2px;
`;

function Slider({ dataSlider, withoutSubPath, height }) {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1);
        } else if (slideIndex === dataSlider.length) {
            setSlideIndex(1);
        }
    };

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1);
        } else if (slideIndex === 1) {
            setSlideIndex(dataSlider.length + 1);
        }
    };

    useInterval(() => {
        nextSlide();
    }, 3000);

    const moveDot = index => {
        setSlideIndex(index);
    };

    return (
        <>
            {dataSlider?.length > 0 && (
                <ContainerSlider height={height}>
                    <div id="toggle-width">
                        {dataSlider.map((img, index) => {
                            return (
                                <div
                                    key={img}
                                    className={slideIndex === index + 1 ? 'slide active' : 'slide '}
                                >
                                    <img
                                        src={createImage(img, withoutSubPath)}
                                        alt={createImage(img, withoutSubPath)}
                                        name={img}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <BtnSlider direction="next" moveSlide={nextSlide} />
                    <BtnSlider direction="prev" moveSlide={prevSlide} />

                    <div className="container-dots">
                        {Array.from({ length: dataSlider.length }).map((item, index) => (
                            <div
                                key={index}
                                onClick={() => moveDot(index + 1)}
                                className={slideIndex === index + 1 ? 'dot active' : 'dot'}
                            ></div>
                        ))}
                    </div>
                </ContainerSlider>
            )}
        </>
    );
}

Slider.propTypes = {
    dataSlider: PropTypes.array.isRequired,
};

export default memo(Slider);

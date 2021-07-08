import React, { memo, useState } from 'react';
import BtnSlider from './BtnSlider';
import PropTypes from 'prop-types';
import { createImage, useInterval } from '../../helpers';
import './shopSlider.css';

function Slider({ dataSlider }) {
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
    }, 2000);

    const moveDot = index => {
        setSlideIndex(index);
    };

    return (
        <>
            {dataSlider?.length > 0 && (
                <div className="container-slider">
                    <div id="toggle-width">
                        {dataSlider.map((img, index) => {
                            return (
                                <div
                                    key={img}
                                    className={slideIndex === index + 1 ? 'slide active' : 'slide '}
                                >
                                    <img
                                        src={createImage(img, false)}
                                        alt={createImage(img, false)}
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
                </div>
            )}
        </>
    );
}

Slider.propTypes = {
    dataSlider: PropTypes.array.isRequired,
};

export default memo(Slider);

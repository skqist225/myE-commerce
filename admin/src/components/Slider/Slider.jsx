import React, { memo } from 'react';
import BtnSlider from './BtnSlider';
import PropTypes from 'prop-types';
import './Slider.css';

function Slider({ dataSlider, handleSelectedImage }) {
    const [slideIndex, setSlideIndex] = React.useState(1);
    const [xTrans, setXTrans] = React.useState(0);

    const nextSlide = () => {
        if (slideIndex !== dataSlider.length) {
            setSlideIndex(slideIndex + 1);
            const _xTrans = slideIndex * 90;
            setXTrans(-Math.abs(_xTrans));
            document.getElementById('toggle-width').style.transform = `translateX(-${_xTrans}px)`;
        } else if (slideIndex === dataSlider.length) {
            return;
        }
    };

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1);
            const _xTrans = xTrans + 90;
            document.getElementById('toggle-width').style.transform = `translateX(${_xTrans}px)`;
            setXTrans(_xTrans);
        } else if (slideIndex === 1) {
            return;
        }
    };

    const moveDot = index => {
        setSlideIndex(index);
    };

    return (
        <div className="container-slider">
            <div id="toggle-width">
                {dataSlider.map(({ imgUrl, id }, index) => {
                    return (
                        <div
                            key={id}
                            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide '}
                        >
                            <img
                                src={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${imgUrl}`}
                                alt={`${process.env.REACT_APP_IMAGE_SERVER_PATH}${imgUrl}`}
                                key={id}
                                onClick={handleSelectedImage}
                                name={imgUrl}
                            />
                        </div>
                    );
                })}
            </div>
            <BtnSlider direction="next" moveSlide={nextSlide} />
            <BtnSlider direction="prev" moveSlide={prevSlide} />

            {/* <div className="container-dots">
                {Array.from({ length: dataSlider.length }).map(
                    (item, index) => (
                        <div
                            key={index}
                            onClick={() => moveDot(index + 1)}
                            className={
                                slideIndex === index + 1 ? 'dot active' : 'dot'
                            }
                        ></div>
                    )
                )}
            </div> */}
        </div>
    );
}

Slider.propTypes = {
    dataSlider: PropTypes.array.isRequired,
};

export default memo(Slider);

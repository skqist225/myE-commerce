import React, { memo } from 'react';
import BtnSlider from './BtnSlider';
import PropTypes from 'prop-types';
import './productSlider.css';
import { createImage } from '../../helpers';

function ProductSlider({ dataSlider, handleSelectedImage }) {
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

    return (
        <div className="productContainer-slider">
            <div id="toggle-width">
                {dataSlider.map(({ imgUrl, id }, index) => {
                    return (
                        <div
                            key={id}
                            className={
                                slideIndex === index + 1
                                    ? 'productSlide active-anim'
                                    : 'productSlide '
                            }
                        >
                            <img
                                src={createImage(imgUrl, false)}
                                alt={createImage(imgUrl, false)}
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
        </div>
    );
}

ProductSlider.propTypes = {
    dataSlider: PropTypes.array.isRequired,
};

export default memo(ProductSlider);

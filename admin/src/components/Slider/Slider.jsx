import React from 'react';
import BtnSlider from './BtnSlider';
import './Slider.css';

const dataSlider = [
    {
        id: '1',
        title: 'abc',
        subTitle: 'sad',
    },
    {
        id: '2',
        title: 'abc',
        subTitle: 'sad',
    },
    {
        id: '3',
        title: 'abc',
        subTitle: 'sad',
    },
    {
        id: '4',
        title: 'abc',
        subTitle: 'sad',
    },
    {
        id: '5',
        title: 'abc',
        subTitle: 'sad',
    },
];

export default function Slider() {
    const PUBLIC_URL = 'http://localhost:2250/uploads/images/';

    const [slideIndex, setSlideIndex] = React.useState(1);

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
            setSlideIndex(dataSlider.length);
        }
    };

    const moveDot = index => {
        setSlideIndex(index);
    };

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                        key={obj.id}
                        className={
                            slideIndex === index + 1
                                ? 'slide active-anim'
                                : 'slide'
                        }
                    >
                        <img src={PUBLIC_URL + `${index + 1}.jpg`} alt="" />
                    </div>
                );
            })}
            <BtnSlider direction="next" moveSlide={nextSlide} />
            <BtnSlider direction="prev" moveSlide={prevSlide} />

            <div className="container-dots">
                {Array.from({ length: 5 }).map((item, index) => (
                    <div
                        onClick={() => moveDot(index + 1)}
                        className={
                            slideIndex === index + 1 ? 'dot active' : 'dot'
                        }
                    ></div>
                ))}
            </div>
        </div>
    );
}

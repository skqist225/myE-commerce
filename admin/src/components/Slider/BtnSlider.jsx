import React from 'react';
import './productSlider.css';

export default function BtnSlider({ direction, moveSlide }) {
    return (
        <button
            onClick={moveSlide}
            className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
            type="button"
        >
            {direction === 'next' ? (
                <svg
                    enableBackground="new 0 0 13 21"
                    viewBox="0 0 13 21"
                    x="0"
                    y="0"
                    className="shopee-svg-icon icon-arrow-right-bold"
                    style={{ width: '25px', height: '25px', fill: 'white' }}
                    onClick={moveSlide}
                >
                    <polygon points="11.1 9.9 2.1 .9 -.1 3.1 7.9 11 -.1 18.9 2.1 21 11.1 12 12.1 11"></polygon>
                </svg>
            ) : (
                <svg
                    enableBackground="new 0 0 13 20"
                    viewBox="0 0 13 20"
                    x="0"
                    y="0"
                    className="shopee-svg-icon icon-arrow-left-bold"
                    style={{ width: '25px', height: '25px', fill: 'white' }}
                    onClick={moveSlide}
                >
                    <polygon points="4.2 10 12.1 2.1 10 -.1 1 8.9 -.1 10 1 11 10 20 12.1 17.9"></polygon>
                </svg>
            )}
        </button>
    );
}

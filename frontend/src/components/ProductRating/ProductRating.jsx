import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex } from '../../globalStyle';
import { SectionTitle } from '../ProductDescription/ProductDescriptionComp';
import {
    ProductRatingSection,
    PaddingLayout,
    RatingBox,
    StarWrapper,
    RatingButton,
    RatingWrapper,
    UserComment,
    Username,
    UserAvatar,
    ReviewTime,
    ApplyHoverEffect,
} from './ProductRatingComponent';
import { StarIcon, LikeIcon } from '../shopList/svgIcon';
import { fetchProductReviews, reviewsSelector, likeReview } from '../../features/reviews';
import { createImage } from '../../helpers';

function ProductRating({ match, bgColor }) {
    const dispatch = useDispatch();

    const { ratingsPerStar } = useSelector(state => state.reviews);
    const reviews = useSelector(reviewsSelector.selectAll);
    const numberOfRatingsPerStar = new Map();

    ratingsPerStar.forEach(({ _id, number_of_ratings }) =>
        numberOfRatingsPerStar.set(_id, number_of_ratings)
    );

    function handleClickForButton() {
        const ratingBtns = document.getElementsByClassName('ratingButton');
        ratingBtns[0].classList.add('active');

        for (let button of ratingBtns) {
            button.addEventListener('click', function () {
                for (let button of ratingBtns) {
                    button.classList.remove('active');
                }

                this.classList.add('active');
            });
        }
    }

    const handleLikeReview = reviewId => {
        dispatch(likeReview([reviewId, 1]));
    };

    const handleUnlikeReview = reviewId => {
        dispatch(likeReview([reviewId, -1]));
    };

    const handleLikeClick = (e, reviewId) => {
        e.preventDefault();
        const heyClickHere = document.getElementsByClassName('heyClickHere')[0];

        if (heyClickHere.classList.contains('selected')) {
            heyClickHere.classList.remove('selected');
            handleUnlikeReview(reviewId);
        } else {
            heyClickHere.classList.add('selected');
            handleLikeReview(reviewId);
        }
    };

    useEffect(() => {
        dispatch(fetchProductReviews(match.params.productId));
    }, [dispatch, match.params.productId]);

    useEffect(() => {
        handleClickForButton();
    }, []);

    return (
        <ProductRatingSection>
            <PaddingLayout>
                <SectionTitle style={{ padding: '0' }}>Đánh giá sản phẩm</SectionTitle>
                <RatingBox bgColor={bgColor}>
                    <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        style={{ flex: '1', alignSelf: 'center' }}
                    >
                        <RatingWrapper color={bgColor}>
                            <span className="first">4.9</span>
                            <span className="second"> trên 5</span>
                        </RatingWrapper>
                        <StarWrapper>
                            <Flex style={{ height: 'fit-content' }} justifyContent="center">
                                {Array.apply(undefined, { length: 5 }).map((val, index) => (
                                    <StarIcon
                                        key={index}
                                        fillColor="#d0011b"
                                        style={{ display: 'block' }}
                                        width="2.5rem"
                                        height="2.5rem"
                                        stroke="#d0011b"
                                    />
                                ))}
                            </Flex>
                        </StarWrapper>
                    </Flex>
                    <Flex
                        height="100%"
                        style={{ flex: '3', marginLeft: '1.9875rem', flexWrap: 'wrap' }}
                    >
                        <RatingButton name="all">Tất cả</RatingButton>
                        <RatingButton name="5star">
                            5 Sao ({numberOfRatingsPerStar.get(5) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="4star">
                            4 Sao ({numberOfRatingsPerStar.get(4) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="3star">
                            3 Sao ({numberOfRatingsPerStar.get(3) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="2star">
                            2 Sao ({numberOfRatingsPerStar.get(2) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="1star">
                            1 Sao ({numberOfRatingsPerStar.get(1) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="haveComment">Có Bình Luận</RatingButton>
                        <RatingButton name="haveMedia">Có Hình Ảnh / Video</RatingButton>
                    </Flex>
                </RatingBox>
                <Flex flexDirection="column" alignItems="flex-start" padding="0 0 2.5rem 2rem">
                    <Flex alignItems="flex-start">
                        {reviews.map(review => (
                            <React.Fragment key={review._id}>
                                <div style={{ marginRight: '1.25rem' }}>
                                    <UserAvatar
                                        src={createImage(review.user.avatar, false)}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <Link to="/">
                                        <Username>
                                            {review.maskName ? '*******' : review.user.username}
                                        </Username>
                                    </Link>
                                    <StarWrapper style={{ marginTop: '0.8rem' }}>
                                        <Flex
                                            style={{ height: 'fit-content' }}
                                            justifyContent="flex-start"
                                        >
                                            {Array.apply(undefined, { length: review.rating }).map(
                                                (val, index) => (
                                                    <StarIcon
                                                        key={index}
                                                        fillColor="#d0011b"
                                                        style={{
                                                            display: 'block',
                                                            marginRight: '3px',
                                                        }}
                                                        width="1.8rem"
                                                        height="1.8rem"
                                                        stroke="#d0011b"
                                                    />
                                                )
                                            )}
                                        </Flex>
                                    </StarWrapper>
                                    <UserComment>{review.comment}</UserComment>
                                    <Flex justifyContent="flex-start" width="100%">
                                        {review.images > 0 &&
                                            review.images.map(image => (
                                                <img src={createImage(image, false)} key={image} />
                                            ))}
                                    </Flex>
                                    <ReviewTime>
                                        {new Date(review.createdAt).toUTCString()}
                                    </ReviewTime>
                                    <ApplyHoverEffect
                                        style={{ marginTop: '2.5rem' }}
                                        color={bgColor}
                                        className="heyClickHere"
                                        onClick={e => handleLikeClick(e, review._id)}
                                    >
                                        <LikeIcon style={{ cursor: 'pointer' }} />
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                marginLeft: '1rem',
                                                color: 'rgba(0,0,0,.4)',
                                                fontSize: '1.8rem',
                                                textTransform: 'capitalize',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {review.number_of_likes > 0
                                                ? review.number_of_likes
                                                : ' Hữu ích ?'}
                                        </span>
                                    </ApplyHoverEffect>
                                </div>
                            </React.Fragment>
                        ))}
                    </Flex>
                </Flex>
            </PaddingLayout>
        </ProductRatingSection>
    );
}

export default ProductRating;

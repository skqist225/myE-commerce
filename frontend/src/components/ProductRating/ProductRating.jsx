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
    ReviewImg,
    ApplyHoverEffect,
    Line,
} from './ProductRatingComponent';
import { StarIcon, LikeIcon } from '../shopList/svgIcon';
import {
    fetchProductReviews,
    reviewsSelector,
    likeReview,
    fetchReviewsByStar,
} from '../../features/reviews';
import { createImage } from '../../helpers';
import { setLikeReviewId, setActiveTab } from '../../features/reviews/reviewsSlice';

function ProductRating({ match, bgColor }) {
    const dispatch = useDispatch();

    const {
        ratingsPerStar,
        avgRatings: avg_ratings,
        successMessage1,
        loading,
        activeTab,
    } = useSelector(state => state.reviews);
    const { user } = useSelector(state => state.auth);
    const reviews = useSelector(reviewsSelector.selectAll);
    const numberOfRatingsPerStar = new Map();

    ratingsPerStar.forEach(({ _id, number_of_ratings }) =>
        numberOfRatingsPerStar.set(_id, number_of_ratings)
    );

    function handleClickForButton() {
        const ratingBtns = document.getElementsByClassName('ratingButton');
        if (activeTab === 1) {
            ratingBtns[0].classList.add('active');
        } else {
            ratingBtns[activeTab - 1].classList.add('active');
        }

        for (let button of ratingBtns) {
            button.addEventListener('click', function (e) {
                // e.preventDefault();

                for (let button of ratingBtns) {
                    button.classList.remove('active');
                }
                this.classList.add('active');
                dispatch(setActiveTab(this.dataset.index));
                if (this.dataset.star === 'all') {
                    dispatch(fetchProductReviews(match.params.productId));
                } else {
                    dispatch(fetchReviewsByStar([match.params.productId, this.dataset.star]));
                }
            });
        }
    }

    const handleLike = () => {
        const heyClickHere = document.getElementsByClassName('heyClickHere');

        for (const likeBtn of heyClickHere) {
            likeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const { reviewId } = this.dataset;

                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                } else {
                    this.classList.add('selected');
                }
                dispatch(setLikeReviewId(reviewId));
                dispatch(likeReview(reviewId));
            });
        }

        const initLikedBtn = [];
        reviews.forEach(({ _id, userLikes }) => {
            if (userLikes.some($user => $user.toString() === user._id.toString())) {
                initLikedBtn.push(_id);
            }
        });

        for (const likebtn of heyClickHere) {
            initLikedBtn.forEach(reviewId => {
                if (likebtn.dataset.reviewId === reviewId) {
                    likebtn.classList.add('selected');
                }
            });
        }
    };

    useEffect(() => {
        const promise = dispatch(fetchProductReviews(match.params.productId));

        return () => {
            promise.abort();
        };
    }, [dispatch, match.params.productId]);

    useEffect(() => {
        handleClickForButton();
        // handleLike();
    }, []);

    useEffect(() => {
        if (successMessage1) {
            handleLike();
        }
    }, [successMessage1]);

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
                            <span className="first">
                                {avg_ratings.length > 0 ? avg_ratings[0].avgRatings : 0}
                            </span>
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
                        <RatingButton name="all" data-star="all" data-index={1}>
                            Tất cả
                        </RatingButton>
                        <RatingButton name="5star" data-star={5} data-index={2}>
                            5 Sao ({numberOfRatingsPerStar.get(5) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="4star" data-star={4} data-index={3}>
                            4 Sao ({numberOfRatingsPerStar.get(4) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="3star" data-star={3} data-index={4}>
                            3 Sao ({numberOfRatingsPerStar.get(3) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="2star" data-star={2} data-index={5}>
                            2 Sao ({numberOfRatingsPerStar.get(2) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="1star" data-star={1} data-index={6}>
                            1 Sao ({numberOfRatingsPerStar.get(1) || 0}){' '}
                        </RatingButton>
                        <RatingButton name="haveComment" data-star="haveComment" data-index={7}>
                            Có Bình Luận
                        </RatingButton>
                        <RatingButton name="haveMedia" data-star="haveMedia" data-index={8}>
                            Có Hình Ảnh / Video
                        </RatingButton>
                    </Flex>
                </RatingBox>
                <Flex flexDirection="column" alignItems="flex-start" padding="0 0 2.5rem 2rem">
                    {reviews.map(review => (
                        <Flex alignItems="flex-start" key={review._id} padding="2rem 0 0 0 ">
                            <div style={{ marginRight: '1.25rem' }}>
                                <UserAvatar src={createImage(review.user.avatar, false)} alt="" />
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
                                <Flex
                                    justifyContent="flex-start"
                                    width="100%"
                                    style={{ flexWrap: 'wrap' }}
                                >
                                    {review.pictures.length > 0 &&
                                        review.pictures.map(image => (
                                            <ReviewImg
                                                src={createImage(image, false)}
                                                key={image}
                                            />
                                        ))}
                                </Flex>
                                <ReviewTime>{new Date(review.createdAt).toUTCString()}</ReviewTime>
                                <ApplyHoverEffect
                                    style={{ marginTop: '2.5rem', paddingBottom: '2.5rem' }}
                                    color={bgColor}
                                    className="heyClickHere"
                                    data-review-id={review._id}
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
                                        {review.userLikes.length > 0
                                            ? review.userLikes.length
                                            : ' Hữu ích ?'}
                                    </span>
                                </ApplyHoverEffect>
                                <Line />
                            </div>
                        </Flex>
                    ))}
                </Flex>
            </PaddingLayout>
        </ProductRatingSection>
    );
}

export default ProductRating;

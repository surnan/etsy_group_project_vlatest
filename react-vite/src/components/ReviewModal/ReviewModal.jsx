// frontend/src/components/ReviewModal/ReviewModal.jsx

import { useState, useEffect } from 'react';
import './ReviewModal.css';
import { postReviewThunk, updateReviewThunk } from '../../store/reviews'
import { useDispatch } from 'react-redux';


const ReviewModal = ({ onClose, onSubmit, id, reviewExists, spotsObj, selectedReview}) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [clickedSubmitBtn, setClickedSubmitBtn] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedReview && selectedReview.review) {
            setReview(selectedReview.review);
        }

        if (selectedReview && selectedReview.stars) {
            setRating(selectedReview.stars);
        }
    }, [selectedReview]);

    useEffect(() => {
        if (review.length >= 10 && rating > 0) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [review, rating]);


    const h2Title = selectedReview ? (
        <>
            How was your stay at <br /> {spotsObj?.name}?
        </>
    ) : (
        "How was your stay?"
    );

    const handleMouseEnter = (star) => {
        setHoverRating(star);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (star) => {
        setRating(star);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClickedSubmitBtn(true);

        const reviewAndRating = {
            review,
            stars: rating
        };

        try {
            if (!reviewExists) {
                const result = await dispatch(postReviewThunk(id, reviewAndRating));
                if (result) {
                    onSubmit({ review, rating });
                    onClose();
                } else {
                    onSubmit({ review, rating });
                    onClose();
                }
            } else {
                console.log('>>>>>>  rating = ', rating)
                await dispatch(updateReviewThunk({ ...selectedReview, review: review, stars: rating }));
                onClose();
            }
        } catch (e) {
            console.log('>> ** >> ERROR: ', e);
        }
    };

    return (
        <div className="modal" onClick={handleOverlayClick}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{h2Title}</h2>
                {!selectedReview && clickedSubmitBtn && reviewExists && <p className='errorUnderneath'>Review already exists for this spot</p>}
                <form onSubmit={handleSubmit} className='reviewForm'>
                    <textarea
                        value={review}
                        placeholder='Leave your review here...'
                        onChange={(e) => setReview(e.target.value)}
                        className='addReviewText'
                        required
                    >
                    </textarea>
                    <div className='starDiv'>
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            const isFilled = starValue <= (hoverRating || rating);
                            return (
                                <div
                                    key={index}
                                    className={`starImage clickable star${starValue}`}
                                    onMouseEnter={() => handleMouseEnter(starValue)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(starValue)}
                                >
                                    {isFilled ? '\u2605' : '\u2606'}
                                </div>
                            );
                        })}
                        <span className="smallFont">&#160;Stars</span>
                    </div>
                    <button
                        type="submit"
                        className={`submitReviewButtonModal ${!isButtonDisabled ? 'enabled clickable' : ''}`}
                        disabled={isButtonDisabled}

                        onClick={handleSubmit}
                    >
                        Submit Your Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { editReviewThunk, getReviewThunk } from '../../redux/review';
import { FaStar } from "react-icons/fa";
// import {getProductsOneThunk} from '../../redux/review';
// console.log('Thunk ', editReviewThunk)
import './AddReviewModal.css';


const UpdateReview = () => {

    const dispatch = useDispatch();
    let { reviewId } = useParams();
    let review = useSelector(state => state.review.currentReview)
    // let editedRevs = useSelector(state => state.review.newllReviews[reviewId]);

    // console.log(review);
    reviewId = parseInt(reviewId);
    const [prodId, setProdId] = useState(review?.productId);
    const [stars, setStars] = useState(review?.stars)
    const [rating, setRating] = useState(review?.review)
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getReviewThunk(reviewId))

            .then((data) => {
                // console.log('Data ', data)
                setStars(data.stars)
                setRating(data.rating)
                setProdId(data.productId)
            })
    }, [dispatch, reviewId])
    // console.log('Yayayayayayay ', review, prodId)



    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = {
            "id": reviewId,
            "review": rating,
            stars
        };

        try {
            await dispatch(editReviewThunk(form));
            navigate(`/products/${prodId}`); // Navigate back to the product details page
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    }


    return (
        <div className="reviewsModalContainer">
            <h2>Update your review</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend><strong>What do you want to say?</strong></legend>
                    <div className="starsBar">
                        {[1, 2, 3, 4, 5].map((star, idx) => {
                            return (
                                <FaStar key={idx}
                                    style={{
                                        cursor: 'pointer',
                                        stroke: 'black',
                                        fill: stars >= star ? 'black' : 'gray',
                                        fontSize: `35px`,
                                    }}
                                    onClick={() => {
                                        setStars(star)
                                    }}
                                />
                            )
                        })}
                    </div>
                    <label>Stars</label>
                    <textarea value={rating} onChange={(e) => setRating(e.target.value)}></textarea>
                    {/* <input value={rating} onChange={(e) => setRating(e.target.value)} type="text" ></input> */}
                    {/* <input  onChange={(e) => setStars(e.target.value)} value = {stars}  placeholder = {`${stars}`}  type = "decimal"/> */}
                </fieldset>
                <button type='submit'>Update the Review</button>
            </form>
        </div>
    )
}

export default UpdateReview;
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addReviewThunk} from '../../redux/review';
import { getUserThunk} from "../../redux/user";

import { FaStar } from "react-icons/fa";
import './AddReviewModal.css';

const AddReviewForm = ()=> {
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');
    const [buttonOut, setButtonOut] = useState(true);
    const {productId} = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    let userId = sessionUser.id;
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    
    useEffect(() => {
        let user = dispatch(getUserThunk(userId))
    }, [userId])

    useEffect(() => {
        setButtonOut(true);
        if(review.length >= 10 && stars){
            setButtonOut(false);
        }
    }, [review, stars])
  
    // const handleSubmit = (e) => {
    //     e.preventDefault();
       
    //     const form = {
    //        stars,
    //        review
    //     }
        
    //     console.log('The form is ', form)
    //     dispatch(addReviewThunk(form, productId, userId));
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = {
            stars,
            review
        };
        
        try {
            await dispatch(addReviewThunk(form, productId, userId));
            navigate(`/products/${productId}`); // Navigate back to the product details page
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };
    
  
    return (
        <div className = "reviewsModalContainer">
         <h2>How was your stay?</h2>
        <form onSubmit={handleSubmit}>
            <textarea placeholder = "Leave your review here..." value = {review}  onChange={(e) => setReview (e.target.value)} type ="text" />
            <div className = "starsBar">
            {[1, 2, 3, 4, 5].map((star, idx) => {
                return (   
                    <FaStar key = {idx}
                    style = {{
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
        
                {/* <input value = {stars}  onChange={(e) => setStars(e.target.value)} placeholder = "Stars" type ="number"></input> */}
           <button disabled = {buttonOut ? true: false} type = 'submit'>Submit Your Review</button>
        </form>
        </div>
    )
    
};

export default AddReviewForm;
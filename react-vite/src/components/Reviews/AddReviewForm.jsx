import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addReviewThunk} from '../../redux/review';
import { FaStar } from "react-icons/fa";
import './AddReviewModal.css';

const AddReviewForm = ({product})=> {
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');
    const [buttonOut, setButtonOut] = useState(true);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
   
    useEffect(() => {
        setButtonOut(true);
        if(review.length >= 10 && stars){
            setButtonOut(false);
        }
    }, [review, stars])
  
    const handleSubmit = (e) => {
        e.preventDefault();
       
        const form = {
           stars,
           review
        }
        // console.log(form);
        // console.log(product.id);
        const productId = product.id
      
        dispatch(addReviewThunk(form, productId)).then(navigate('/'));
    }

  
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
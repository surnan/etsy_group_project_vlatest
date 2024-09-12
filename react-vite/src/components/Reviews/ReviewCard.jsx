import { NavLink } from "react-router-dom";
import './ReviewCard.css'
const ReviewCard = ({rev}) => {
    return (
        <div className = "reviewCard">
        <h3>{rev.stars}</h3>
        <p>{rev.review}</p>
        <ul>
            <li><NavLink to={`reviews/${rev.id}/update`}>Update Review</NavLink></li>
            <li><NavLink to={`reviews/${rev.id}/delete`}>Delete Review</NavLink></li>
        </ul>
        </div>
        
    )
};

export default ReviewCard
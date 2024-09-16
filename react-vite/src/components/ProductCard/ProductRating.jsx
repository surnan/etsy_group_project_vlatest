import { FaStar } from 'react-icons/fa6';
import './ProductCard.css';

export default function ProductRating({reviews, productRating}) {
    // console.log(productRating)
    return (
        <div className="ProductCard__content__rating">
            {productRating.map((star, index) => (
                <FaStar key={index} size={14} color={star ? 'gold' : 'gray'} />
            ))}
            <span>{`(${reviews?.length})`|| "0"}</span>
        </div>
    )
}
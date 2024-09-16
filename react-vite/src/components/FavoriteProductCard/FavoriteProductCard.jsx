import { FaStar } from "react-icons/fa";
import './FavoriteProductCard.css';

function getProductStarRating(reviews) {
    if (reviews.length === 0) {
        return [0, 0, 0, 0, 0];
    }
    let total = 0;
    for (let review of reviews) {
        total += review.stars;
    }
    let result = new Array(5);
    for(let i = 0; i < Math.floor(total / reviews.length); i++) {
        result[i] = 1;
    }
    return result;
}

function FavoriteProductCard({ product }) {
    // console.log("FavoriteProductCard product", product)
    const productImage = product.product_images.length ? product.product_images[0]?.image_url : 'https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1';
    const productRating = getProductStarRating(product.reviews);

    // console.log(productRating, 'productRating');

    return (
        <div className="FavoriteProductCard">
            <div className="FavoriteProductCard__image">
                <img src={productImage} alt={product.name} />
            </div>
            <div className="FavoriteProductCard__content">
                <div className="FavoriteProductCard__content__title">
                    <h3>{product.name}</h3>
                </div>
                <div className="FavoriteProductCard__content__rating">
                    {productRating.map((star, index) => (
                        <FaStar key={index} size={14} color={star ? 'gold' : 'gray'} />
                    ))}
                    <span>{`(${product.reviews.length})`}</span>
                </div>
                <div className="FavoriteProductCard__content__price">
                    <p>${product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default FavoriteProductCard;
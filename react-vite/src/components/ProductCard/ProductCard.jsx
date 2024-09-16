import './ProductCard.css';
import ProductRating from "./ProductRating";

export function getProductStarRating(reviews) {
    if (!reviews || reviews.length === 0) {
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
    for (let el of result) {
        if (!el) {
            result.splice(result.indexOf(el), 1, 0);
        }
    }
    // console.log(result)
    return result;
}

function ProductCard({ product }) {
    const productImage = product.product_images?.length ? product.product_images[0]?.image_url : 'https://i0.wp.com/mikeyarce.com/wp-content/uploads/2021/09/woocommerce-placeholder.png?ssl=1';
    const productRating = getProductStarRating(product.reviews || null);

    // console.log(productRating, 'productRating');

    return (
        <div className="ProductCard">
            <div className="ProductCard__image">
                <img src={productImage} alt={product.name} />
            </div>
            <div className="ProductCard__content">
                <div className="ProductCard__content__title">
                    <h3>{product.name}</h3>
                </div>
                <ProductRating reviews={product.reviews || null} productRating={productRating} />
                <div className="ProductCard__content__price">
                    <p>${product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
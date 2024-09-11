import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOneThunk } from "../../redux/product";
import { getReviewsThunk } from "../../redux/review";
import ReviewCard from "../ReviewCard/ReviewCard";
import './ProductDetails.css';

export default function ProductDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const [mainImage, setMainImage] = useState(null); // State to track the main image
    const [showReviews, setShowReviews] = useState(false);
    const [reviewChecker, setReviewChecker] = useState(false);
    const [deleteReviewChecker, setDeleteReviewChecker] = useState(false);

    const product = useSelector(state => state.product.single);
    let reviews = useSelector((state) => state.allReviews);
    const productReviews = reviews ? reviews.find(review => {return review.productId === product.id}) : undefined;
    console.log('The reviews for the product are ', productReviews);

    useEffect(() => {
        dispatch(getProductsOneThunk(parseInt(productId)));
        dispatch(getReviewsThunk(productId))
            .then(() => setShowReviews(true))
            .then(() => setDeleteReviewChecker(false))
            .then(() => {if (!product)
                return navigate('/404');});
       
    }, [dispatch, reviewChecker, deleteReviewChecker, productId]);

    useEffect(() => {
        // Set the first image as the main image when the product is loaded
        if (product && product.product_images?.length > 0) {
            setMainImage(product.product_images[0]?.image_url);
        }
    }, [product]);

    if (!product)
        return navigate('/404');

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl); // Update the main image when a thumbnail is clicked
    };

    return (
        <div className="product-main-container">
            <div className="product-image-gallery">
                {product.product_images?.map((image, index) => (
                    <img
                        key={index}
                        src={image.image_url}
                        alt={product.name}
                        onClick={() => handleImageClick(image.image_url)} // Change main image on click
                        className={image.image_url === mainImage ? 'active-thumbnail' : ''}
                    />
                ))}
            </div>
            <div className="product-main-image">
                <img src={mainImage} alt={product.name} />
            </div>
            <div className="product-details">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button>Add to Cart</button>
            </div>
            {showReviews ? productReviews?.map (rev => {
                console.log('My review, ', rev);
                <ReviewCard rev = {rev}/>
            }): ''}
        </div>
       
    )
}

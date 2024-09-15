import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOneThunk } from "../../redux/product";
import { Link, useNavigate } from 'react-router-dom';
import { getReviewsThunk } from "../../redux/review";
import { addFavoriteThunk, deleteFavoriteThunk, getFavoritesAllThunk } from "../../redux/favorite";
import './ProductDetails.css';
import '../404/Page404.css';
import Page404 from "../404/Page404";
import ReviewCard from "./ReviewCard";
import React from "react";

export default function ProductDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { productId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const [mainImage, setMainImage] = useState(null); // State to track the main image
    const [deleteReviewChecker, setDeleteReviewChecker] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const reviewChecker = false;

    // Fetch product and reviews when component mounts

    const product = useSelector(state => state.product.single);

    const productReviews = useSelector(state => state.review.allReviews);
    const favorites = useSelector(state => state.favorites.allFavorites);

    useEffect(() => {
        if (favorites && product) {
            setIsFavorite(favorites.some(favorite => favorite.productId === product.id));
        }
    }, [favorites, product]);

    const isSeller = sessionUser?.id === product?.sellerId;

    useEffect(() => {
        dispatch(getProductsOneThunk(parseInt(productId)))
        .then(() => dispatch(getReviewsThunk(parseInt(productId))))
        .then(() => setShowReviews(true))
        .then(() => setDeleteReviewChecker(false))
        .then(() => {
                if (!product) return navigate('/404');
        });
        dispatch(getFavoritesAllThunk());
    }, [dispatch, productId, reviewChecker, deleteReviewChecker]);

    useEffect(() => {
        // Set the first image as the main image when the product is loaded
        if (product && product.product_images?.length > 0) {
            setMainImage(product.product_images[0]?.image_url);
        }
    }, [product]);

    if (!product) {
        return (
            <Page404 />
        );
    }

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl); // Update the main image when a thumbnail is clicked
    };

    const handleAddFavorite = () => {
        console.log("is handleAddFavorite working?")
        if (!sessionUser) {
            return navigate('/login'); // Redirect to login if user is not authenticated
        }
        const favoriteData = {
            userId: sessionUser.id,
            productId: product.id,
        };
        console.log("favoriteData in ProductDetails addFavorite func", favoriteData)
        dispatch(addFavoriteThunk(favoriteData))
            .then(() => dispatch(getFavoritesAllThunk()))
            .catch((error) => {
                if (error.message === 'You cannot favorite your own product') {
                    alert('Error: You cannot favorite your own product.');
                } else {
                    console.error("Failed to add favorite", error);
                }
            });
    };

    const handleDeleteFavorite = () => {
        const favorite = favorites.find(fav => fav.productId === product.id);
        if (favorite) {
            dispatch(deleteFavoriteThunk(favorite.id))
                .then(() => dispatch(getFavoritesAllThunk()));
        }
    };

    return (
        <>
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
                    <h2>${product.price}</h2>
                    <p>{product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
            <div className="addReview">
                <Link to={`/reviews/${productId}/add`}><button>Add Review</button></Link>
            </div>
            <div className="reviews-container">
                <h2>{`${productReviews.length}`} <span>reviews</span></h2>
                {productReviews.length > 0 ? (
                    productReviews.map((review, index) => (
                        <React.Fragment key={index}>
                            <ReviewCard review={review} />
                            <div className="horizontal-divider"></div>
                        </React.Fragment>
                    ))
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
            <div className="product-details">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>${product.price}</p>
                {!isSeller && ( // Only show these buttons if the user is not the seller
                    isFavorite ? (
                        <button onClick={handleDeleteFavorite}>Delete Favorite</button>
                    ) : (
                        <button onClick={handleAddFavorite}>Add to Favorites</button>
                    )
                )}
                <button>Add to Cart</button>
            </div>
        </>
    );
}
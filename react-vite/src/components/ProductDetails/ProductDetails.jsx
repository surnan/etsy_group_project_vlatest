import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOneThunk } from "../../redux/product";
import { Link, useNavigate } from 'react-router-dom';
import { getReviewsThunk } from "../../redux/review";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { addFavoriteThunk, deleteFavoriteThunk, getFavoritesAllThunk } from "../../redux/favorite";
import './ProductDetails.css';
import '../404/Page404.css';
import ReviewCard from "./ReviewCard";
import React from "react";

export default function ProductDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const [mainImage, setMainImage] = useState(null); // State to track the main image
    const [deleteReviewChecker, setDeleteReviewChecker] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const [reviewCardChecker, setReviewCardChecker] = useState(false);

    const user = useSelector(state => state.session.user);
    const product = useSelector(state => state.product.single);
    const productReviews = useSelector(state => state.review.allReviews);
    const favorites = useSelector(state => state.favorites.allFavorites);

    useEffect(() => {
        // Fetch product and reviews when component mounts
        setIsLoading(true); // Set loading true when data fetching starts
        dispatch(getProductsOneThunk(parseInt(productId)))
            .then((fetchedProduct) => {
                if (!fetchedProduct) {
                    navigate('/404'); // Navigate to 404 only if product not found
                } else {
                    setShowReviews(true);
                    setDeleteReviewChecker(false);
                }
            })
            .then(() => dispatch(getReviewsThunk(parseInt(productId))))
            .then(() => dispatch(getFavoritesAllThunk()))
            .finally(() => setIsLoading(false)); // Set loading false once data is fetched
    }, [dispatch, productId, deleteReviewChecker, reviewCardChecker, navigate]);

    useEffect(() => {
        if (favorites && product) {
            setIsFavorite(favorites.some(favorite => favorite.productId === product.id));
        }
    }, [favorites, product]);

    useEffect(() => {
        // Set the first image as the main image when the product is loaded
        if (product && product.product_images?.length > 0) {
            setMainImage(product.product_images[0]?.image_url);
        }
    }, [product]);

    // Display loading state until the product is fully loaded
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl); // Update the main image when a thumbnail is clicked
    };

    const handleAddFavorite = () => {
        if (!sessionUser) {
            return navigate('/login'); // Redirect to login if user is not authenticated
        }
        const favoriteData = {
            userId: sessionUser.id,
            productId: product.id,
        };
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

    const addToCart = () => {
        return window.alert("feature coming soon");
    }

    return (
        <>
            <div className="product-main-container">
                <div className="product-image-gallery">
                    {product.product_images?.map((image, index) => (
                        image.image_url !== '' && (
                            <img
                                key={index}
                                src={image.image_url}
                                alt={product.name}
                                onClick={() => handleImageClick(image.image_url)} // Change main image on click
                                className={image.image_url === mainImage ? 'active-thumbnail' : ''}
                            />
                        )
                    ))}
                </div>
                <div className="product-main-image">
                    <img src={mainImage} alt={product.name} />
                </div>
                <div className="product-details">
                    <h1>{product.name}</h1>
                    <h2>${product.price}</h2>
                    <p>{product.description}</p>
                    {sessionUser?.id === product.sellerId ? (
                        <h2>You are selling this product.</h2>
                    ) : (
                        !user ? (
                            <div className="login-to-review-container">
                                <span>Login to add as a Favorite and Add to Cart</span>
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Log In"
                                        modalComponent={<LoginFormModal />}
                                    />
                                </button>
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Sign Up"
                                        modalComponent={<SignupFormModal />}
                                    />
                                </button>
                            </div>
                        ) : (
                            isFavorite ? (
                                <>
                                    <button onClick={handleDeleteFavorite}>Delete Favorite</button>
                                    <button onClick={addToCart}>Add to Cart</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleAddFavorite}>Add to Favorites</button>
                                    <button onClick={addToCart}>Add to Cart</button>
                                </>
                            )
                        )
                    )}

                </div>
            </div>
            <div className="addReview">
                {user ? (
                    <Link to={`/reviews/${productId}/add`}><button>Add Review</button></Link>
                ) : (
                    <div className="login-to-review-container">
                        <span>Login to leave a review</span>
                        <button>
                            <OpenModalMenuItem
                                itemText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                        </button>
                        <button>
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                        </button>
                    </div>
                )}
            </div>
            <div className="reviews-container">
                {product.reviews?.length > 0 ? (
                    <h2>{`${product.reviews.length}`} <span>reviews</span></h2>
                ) : (
                    <h2>No reviews yet</h2>
                )}
                {product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <React.Fragment key={index}>
                            <ReviewCard review={review} setReviewCardChecker={setReviewCardChecker} />
                            <div className="horizontal-divider"></div>
                        </React.Fragment>
                    ))
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
        </>
    );
}

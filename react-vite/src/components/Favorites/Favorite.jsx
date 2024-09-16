import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getFavoritesThunk } from '../../redux/favorites';
import { useNavigate } from 'react-router-dom';
import { getFavoritesAllThunk } from '../../redux/favorite';
// import ProductCard from '../ProductCard';
// import ProductCard from '../ProductCard/ProductCard';
import FavoriteProductCard from '../FavoriteProductCard/FavoriteProductCard';
import productReducer from '../../redux/product';

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getFavoritesAllThunk());
    }, [dispatch]);

    const favorites = useSelector(state => state.favorites.allFavorites);
    // console.log("favorites", favorites)

    if (!favorites.length) {
        return <p>You have no favorite products.</p>;
    }

    const goToProductDetail = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/${product.id}`);  // Navigate to product details page
    };

    // console.log("favorites[0].productId", favorites[0].productId)
    return (
        <div className="favorites-container">
            {favorites.map(favorite => (
                // <h1> TEST</h1>
                // <ProductCard key={product.id} product={productId} />
                <div key={favorite.product.id} className="favorites-product-card" onClick={(e) => goToProductDetail(e, favorite.product)}>
                    <FavoriteProductCard key={favorite.product.id} product={favorite.product} />
                </div>
            ))}
        </div>
    );
};

export default Favorites;
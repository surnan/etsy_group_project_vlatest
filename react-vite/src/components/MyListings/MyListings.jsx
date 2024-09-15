import { useDispatch, useSelector } from 'react-redux';
import './MyListings.css';
import { useEffect, useState } from 'react';
import { getProductsOwnedThunk } from '../../redux/product';
import ProductCard from '../ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

export default function MyListings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const ownedProducts = useSelector(state => state.product.ownedListings);
    const [loaded, setLoaded] = useState(false);
    const [productChecker, setProductChecker] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && !loaded) {
            dispatch(getProductsOwnedThunk(user.id))
                .then(() => setLoaded(true))
                .then(() => setProductChecker(false));
        }
    }, [dispatch, user, productChecker, navigate]);

    if (!user) {
        return navigate('/login');
    }

    if (!loaded) {
        return (
            <>
                <h1>My Listings</h1>
                <div>Loading...</div>
            </>
        );
    }

    if(ownedProducts.length === 0) {
        return (
            <>
                <h1>My Listings</h1>
                <div className='no-listings'>No listings found. Create a new listing <a href="/products/new">here</a>.</div>
            </>
        );
    }

    const handleUpdateProduct = (e, productId) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/user/listings/${productId}`);
    }

    const handleDeleteProduct = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onModalClose = () => {
        setProductChecker(prev => !prev); // Toggle spotChecker to trigger useEffect
    };

    // Render the user's listings using the ProductCard component
    return (
        <div className="my-listings-container">
            <h1>My Listings</h1>
            <div className='products-container'>
            {ownedProducts.map(product => (
                <div className='product-container' key={product.id}>
                    <div className="listings-grid" key={product.id}>
                        <ProductCard key={product.id} product={product} />
                    </div>
                    <div className="crud-buttons">
                        <button onClick={(e) => handleUpdateProduct(e, product.id)}>
                            <FaPen />
                            Update
                        </button>
                        <button className="delete-button-product" onClick={(e) => handleDeleteProduct(e, product.id)}>
                            <FaTrashCan />
                            <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<ConfirmDeleteModal productId={product.id} setProductChecker={setProductChecker} />}
                                onModalClose={async () => {
                                    await onModalClose
                                }}
                            />
                        </button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

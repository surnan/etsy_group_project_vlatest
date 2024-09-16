import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFavoritesAllThunk } from '../../redux/favorite';
// import { Link } from 'react-router-dom';
import './FavoritesButton.css';

const FavoritesButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getFavoritesAllThunk());
    }, [dispatch]);

    const handleClick = () => {
        navigate('/favorites');
    };

    return (
        <button className="favorites-button" onClick={handleClick}>
            Favorites
        </button>
    );
};

export default FavoritesButton;
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import NavLogo from './NavLogo';
import Categories from './Categories';
import SearchBar from './SearchBar';
import ShoppingCartButton from './ShoppingCartButton';
// import FavoritesButton from './FavoritesButton'; 
import FavoritesButton from './FavoriteButton';
import { getFavoritesAllThunk } from '../../redux/favorite';

function Navigation() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const shoppingCart = useSelector(state => state.shoppingCart);

    useEffect(() => {
        if (sessionUser) {
            // checks if user is logged in
            dispatch(getFavoritesAllThunk());
        }
    }, [sessionUser, dispatch]);

    return (
        <div className='navigation-list'>
            <NavLogo />
            <div className='cat-search'>
                <Categories />
            </div>
            <div className='search'>
                <SearchBar />
            </div>
            <div className='profile-container'>
                <FavoritesButton />
                <ProfileButton user={sessionUser} />
                <ShoppingCartButton shoppingCart={shoppingCart} />
            </div>
        </div>
    );
}

export default Navigation;
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import * as sessionActions from '../../redux/session';
import { useSelector } from 'react-redux';

import './ProfileButton.css';
import { useNavigate } from 'react-router-dom';

function ShoppingCartButton({ shoppingCart }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent the menu from closing when toggling it
        setShowMenu(!showMenu);
    };

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // Check if the click happened outside the dropdown
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunkLogout());
        closeMenu();
        navigate('/');
    };

    const goToManageSpots = () => {
        navigate('/spots/current');
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className='shopping-cart-button' onClick={() => window.alert("Feature Coming Soon")}>
            {
                user ? (
                    <FaShoppingCart style={{fontSize: "18px"}}/>
                ) : (<></>)
            }
        </div>
    );
}

export default ShoppingCartButton;

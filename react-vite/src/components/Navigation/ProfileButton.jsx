import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { FaAngleDown } from "react-icons/fa6";
import * as sessionActions from '../../redux/session';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import './ProfileButton.css';
import { useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent the menu from closing when toggling it
    setShowMenu(!showMenu);
  };

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
    navigate('/user/listings');
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className='nav-bar-dropdown' onClick={toggleMenu}>
      {/* <FaBars onClick={toggleMenu} className='hamburger' /> */}
      {user ? (
        <div className='username-profile-main-container'>
          <div className='username-profile' onClick={toggleMenu}>
            <span>{user.username[0]}</span>
          </div>
          <FaAngleDown style={{fontSize: "10px"}} onClick={toggleMenu} />
        </div>
      ) : (
        <>
          <FaUserCircle onClick={toggleMenu} />

        </>
      )}
      <ul className={ulClassName} ref={ulRef} onClick={(e) => e.stopPropagation()}>
        {user ? (
          <>
            <li>Hello, {user.username}</li>
            <div className='divider-horizontal'></div>
            <li onClick={goToManageSpots}>Manage Listings</li>
            <div className='divider-horizontal'></div>
            <li onClick={() => navigate('/products/new')}>Create Listing</li>
            <div className='divider-horizontal'></div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;

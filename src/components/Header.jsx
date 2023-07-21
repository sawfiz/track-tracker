// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Config
import { auth } from '../config/firebase';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Components
import { Auth } from './Auth';

// Modals
import SignOutModal from '../modals/SignOutModal';

export default function Header() {
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserInfo({});
      hideModal();
      navigate('/');
      setIsLoggedIn(false);
    } catch (err) {
      console.log('Error signing out', err.message);
    }
  };

  return (
    <div className="grid grid-cols-[3rem_auto] bg-slate-800">
      <div className="flex">
        <Link to={'/'}>
          <img src="/images/athlelite.png" alt="Team Athlelite" className="" />
        </Link>
      </div>

      <div className="flex justify-around">
        <NavLink
          to="/"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          Home
        </NavLink>

       {(isLoggedIn && ['admin', 'coach'].includes(userInfo.role )) && <NavLink
          to="/admin"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          Admin
        </NavLink>}

       {(isLoggedIn && userInfo.role === 'parent' ) && <NavLink
          to="/children"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          My Children
        </NavLink>}

        <NavLink
          to="/about"
          className={
            'flex items-end pb-1 no-underline  text-slate-400 hover:text-slate-200'
          }
        >
          About
        </NavLink>
        <div className="flex justify-center items-end pb-1">
          {!isLoggedIn && <Auth />}
          {isLoggedIn && (
            <button onClick={showModal} className="pb-1">
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-8 h-8 rounded-full border hover:border-red-500"
              />
            </button>
          )}
        </div>
      </div>
      <SignOutModal show={show} hideModal={hideModal} handleSignOut={handleSignOut}/>
    </div>
  );
}

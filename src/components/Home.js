import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import AboutUs from './AboutUs';
import News from './News';

export const Home = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);

  return (
    <main>
      {isLoggedIn && <p>Hello, {userInfo.name}</p>}
      {isLoggedIn &&
        (userInfo.role === 'admin' || userInfo.role === 'coach') && (
          <p>
            <Link to="/admin">Admin Tools</Link>
          </p>
        )}
      {isLoggedIn && userInfo.role === 'parent' && (
        <p>
          <Link to="/children">My children</Link>
        </p>
      )}

      <News />
      <AboutUs />
    </main>
  );
};

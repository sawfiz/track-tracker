// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Config
import { auth } from '../config/firebase';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Components
import { Auth } from './Auth';

const S = {
  Header: styled.div`
    background: var(--color-dark);
    display: grid;
    grid-template-columns: 100px auto;
    color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  `,
  SplashImgContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  SplashImg: styled.img`
    /* width: clamp(300px, 70%, 600px); */
    width: 100px;
  `,
  Container1: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `,
  Container2: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  H1: styled.h1`
    font-size: clamp(1.4rem, 3vw, 4rem);
    text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.4);
    margin: auto;
  `,
  Button: styled.button`
    cursor: pointer;
    margin: 2%;
  `,
  SignInImg: styled.img`
    width: 191px;
    height: 46px;
  `,
  Google: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2%;
  `,
  Avatar: styled.img`
    width: 2rem;
    height: 2ram;
    border-radius: 50%;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  `,
  SignOut: styled.button`
    border: none;
    background: none;
    cursor: pointer;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    &:hover {
      /* transform: scale(1.2); */
      color: red;
    }
  `,
  Nav: styled.nav`
    display: flex;
    justify-content: space-around;
  `,
};

export function Header () {
  const { setUserInfo, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserInfo({});
      navigate('/');
      setIsLoggedIn(false);
    } catch (err) {
      console.log('Error signing out', err.message);
    }
  };

  return (
    <S.Header>
      <S.SplashImgContainer>
        <Link to={'/'}>
          <S.SplashImg src="/images/athlelite.png" alt="Team Athlelite" />
        </Link>
      </S.SplashImgContainer>

      <S.Container1>
        <S.Container2>
          <S.H1>Team Athlelite</S.H1>
          {!isLoggedIn && <Auth />}
          {isLoggedIn && (
            <S.Google>
              <S.Avatar src={user.photoURL} alt="Avatar" />
              <S.SignOut onClick={handleSignOut}> Sign Out </S.SignOut>
            </S.Google>
          )}
        </S.Container2>
        <S.Nav>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            Home
          </NavLink>
          <NavLink to="/about" style={{ textDecoration: 'none' }}>
            About Us
          </NavLink>
        </S.Nav>
      </S.Container1>
    </S.Header>
  );
};

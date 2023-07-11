import React, { useContext } from 'react';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';

import { Auth } from './Auth';

import athleliteImg from '../images/athlelite.png';

const S = {};

S.Header = styled.div`
  background: var(--color-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  /* border-bottom: 2px black solid; */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
`;

S.H1 = styled.h1`
  font-size: clamp(1.4rem, 3vw, 4rem);
  text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.4);
`;

S.SplashImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

S.SplashImg = styled.img`
  /* width: clamp(300px, 70%, 600px); */
  width: 100px;
`;

S.Button = styled.button`
  /* border: none; */
  cursor: pointer;
  margin: 2%;
`;

S.SignInImg = styled.img`
  width: 191px;
  height: 46px;
`;

S.Google = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2%;
`;

S.Avatar = styled.img`
  width: 2rem;
  height: 2ram;
  border-radius: 50%;
  border: 1px solid lightgray;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

S.SignOut = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    /* transform: scale(1.2); */
    color: red;
  }
`;

export const Header = () => {
  const { loggedIn, setLoggedIn, setUserInfo } = useContext(UserContext);
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setUserInfo({});
      navigate('/');
    } catch (err) {
      console.log('Error signing out', err.message);
    }
  };

  return (
    <S.Header>
      <S.SplashImgContainer>
        <a href="/">
          <S.SplashImg src={athleliteImg} alt="Team Athlelite" />
        </a>
      </S.SplashImgContainer>
      <S.H1>Team Athlelite</S.H1>
      {!loggedIn && <Auth />}
      {loggedIn && (
        <S.Google>
          <S.Avatar src={user.photoURL} alt="Avatar" />
          <S.SignOut onClick={handleSignOut}> Sign Out </S.SignOut>
        </S.Google>
      )}
    </S.Header>
  );
};

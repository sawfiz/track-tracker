import React, { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';

import { auth, googleProvider } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';

export const Auth = () => {
  const { setLoggedIn, setUserId } = useContext(UserContext);

  const signinWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setLoggedIn(true);
      setUserId(auth.currentUser.uid);
    } catch (err) {
      console.log('Error');
    }
  };

  const S = {};
  S.SignInImg = styled.img`
    width: 90px;
    height: 20px;
  `;

  S.Button = styled.button`
    cursor: pointer;
    margin-right: 2%;
  `;

  return (
      <S.Button onClick={(e) => signinWithGoogle(e)}>
        Sign In
      </S.Button>
  );
};

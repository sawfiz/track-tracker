// Libraries
import React, { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';

// Config
import { auth, googleProvider } from '../config/firebase';

// Contexts
import { UserContext } from '../contexts/UserContext';

const S = {
  SignInImg: styled.img`
    width: 90px;
    height: 20px;
  `,
  Button: styled.button`
    cursor: pointer;
    margin-right: 2%;
  `,
};

export const Auth = () => {
  const { setUserId, checkUser, getUserInfo, setIsLoggedIn } =
    useContext(UserContext);

  const signinWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setUserId(auth.currentUser.uid);
      checkUser(auth.currentUser.uid);
      getUserInfo(auth.currentUser.uid);
      setIsLoggedIn(true);
    } catch (err) {
      console.log('Error');
    }
  };

  return <S.Button onClick={(e) => signinWithGoogle(e)}>Sign In</S.Button>;
};

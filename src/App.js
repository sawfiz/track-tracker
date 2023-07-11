import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { auth } from './config/firebase';

import { UserContext } from './contexts/UserContext';

import './App.css';

import { Header } from './components/Header';
import { Home } from './components/Home';
import Admin from './components/Admin';
import Footer from './components/Footer';
import AddAttendence from './components/AddAttendence';


const S = {};
S.App = styled.div`
  background: var(--color-light);
  width: clamp(var(--min-content-width), 100%, var(--max-content-width));
  margin: auto;
  position: relative;
  height: calc(100vh - 1rem);
  border-radius: 5px;
`;

function App() {
  const { setLoggedIn, setUserId, getUserInfo } = useContext(UserContext);

  // Keep user logged in after a page refresh
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setLoggedIn(true);
        setUserId(user.uid);
        getUserInfo(user.uid);
      } else {
        // User is logged out
        setLoggedIn(false);
        setUserId('');
      }
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <S.App>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-attendence" element={<AddAttendence />} />
        </Routes>
      </S.App>
      <Footer />
    </>
  );
}

export default App;

import React, { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { auth } from './config/firebase';

import { UserContext } from './contexts/UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from './components/Header';
import { Home } from './components/Home';
import Admin from './components/Admin';
import Footer from './components/Footer';
import AddAttendance from './components/AddAttendance';
import ShowAttendance from './components/ShowAttendance';
import ManageAthletes from './components/ManageAthletes';
import AthleteDetails from './components/AthleteDetails';
import ManageUsers from './components/ManageUsers';
import ManageParents from './components/ManageParents';
import Children from './components/Children';

const S = {};
S.App = styled.div`
  background: var(--color-light);
  width: clamp(var(--min-content-width), 100%, var(--max-content-width));
  margin: auto;
  position: relative;
  min-height: calc(100vh - 1rem);
  border-radius: 5px;
`;

function App() {
  const { setUserId, getUserInfo, setIsLoggedIn } = useContext(UserContext);

  // Keep user logged in after a page refresh
  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setUserId(user.uid);
        getUserInfo(user.uid);
        setIsLoggedIn(true);
      } else {
        // User is logged out
        setIsLoggedIn(false);
        setUserId('');
      }
    });
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <S.App>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-attendance" element={<AddAttendance />} />
          <Route path="/attendance" element={<ShowAttendance />} />
          <Route path="/athletes" element={<ManageAthletes/>} />
          <Route path="/manage-users" element={<ManageUsers/>} />
          <Route path="/parents" element={<ManageParents/>} />
          <Route path="/children" element={<Children/>} />
          <Route
          path="/athletes/:id"
          element={<AthleteDetails  />}
        />
        </Routes>
      </S.App>
      <Footer />
    </>
  );
}

export default App;

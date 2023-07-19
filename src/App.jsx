// Libraries
import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';

// Config
import { auth } from './config/firebase';

// Contexts
import { UserContext } from './contexts/UserContext';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Header } from './components/Header';
import { Home } from './components/Home';
import { PrivateRoutes } from './components/PrivateRoutes';
import Footer from './components/Footer';
import NewsDetails from './components/NewsDetails';

// Code
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
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

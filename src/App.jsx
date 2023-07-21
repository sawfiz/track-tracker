// Libraries
import React, { useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { RouterProvider } from 'react-router-dom';

// Config
import { auth } from './config/firebase';
import router from './routing/Router';

// Contexts
import { UserContext } from './contexts/UserContext';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;

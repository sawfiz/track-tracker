import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { auth } from './config/firebase';

import UserContextProvider from './contexts/UserContext';

import { Header } from './components/Header';
import { Home } from './components/Home';
import Footer from './components/Footer';


function App() {
  const S = {};
  S.App = styled.div`
    background: var(--color-light);
    width: clamp(var(--min-content-width), 100%, var(--max-content-width));
    margin: auto;
    position: relative;
    height: calc(100vh - 1rem);
    border-radius: 5px;
  `;

  return (
    <>
      <S.App>
        <UserContextProvider>
          <Header />
          <Home />
          {/* <Auth /> */}
          {/* <Routes>
          <Route path="/" element={<Auth />} />
          {/* <Route
            path="/home"
            element={
              loggedIn && (
                // <BookListContextProvider>
                //   <BookDetailsContextProvider>
                //     <Header />
                //     <BooksHeader />
                //     <Books />
                //   </BookDetailsContextProvider>
                // </BookListContextProvider>
              )
            } */
          /* />
        </Routes> */}
        </UserContextProvider>
      </S.App>
      <Footer />
    </>
  );
}

export default App;

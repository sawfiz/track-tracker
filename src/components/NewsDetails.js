import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Config
import { db } from '../config/firebase';

import { UserContext } from '../contexts/UserContext';

import Button from 'react-bootstrap/esm/Button';
import newsImg from '../images/default-news.png';

const S = {
  Buttons: styled.div`
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
  `,
  CroppedImage: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
  `,
};

export default function NewsDetails() {
  const { isLoggedIn, userInfo } = useContext(UserContext);
  const { id } = useParams();
  const newsCollection = collection(db, 'news');

  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const docRef = doc(newsCollection, id);
    const data = await getDoc(docRef);
    setNews(data.data());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      {isLoggedIn &&
        (userInfo.role === 'admin' || userInfo.role === 'coach') && (
          <>
            <p>
              <Link to="/admin">Admin Tools</Link>
            </p>
            <S.Buttons>
              <Button variant="primary">Edit this</Button>
              <Button variant="danger">Delete this</Button>
            </S.Buttons>
          </>
        )}
      <h5>{news.headline}</h5>
      <div>{news.date}</div>{' '}
      <div>
        <>
          {news.photoURL ? (
            <S.CroppedImage src={news.photoURL} alt="news" />
          ) : (
            <S.CroppedImage src={newsImg} alt="news" />
          )}
        </>
        {news.text}
      </div>
    </main>
  );
}

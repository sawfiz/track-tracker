import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';

// Config
import { db } from '../config/firebase';

import newsImg from '../images/default-news.png';

const S = {
  CroppedImage: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
  `,
};

export default function NewsDetails() {
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

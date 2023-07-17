// Libraries
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Components
import NewsBrief from './NewsBrief';

// Styling
import styled from 'styled-components';
import Button from 'react-bootstrap/esm/Button';
import AddNewsModal from '../modals/AddNewsModal';

const S = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 1rem 0;
  `,
  Buttons: styled.div`
    margin: 1rem;
    display: flex;
    justify-content: space-around;
  `,
};

export default function EditNews() {
  const newsCollection = collection(db, 'news');

  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    const docRefs = await getDocs(newsCollection);
    const sortedNews = docRefs.docs.sort((a, b) => {
      const dateA = a.data().date;
      const dateB = b.data().date;
      return dateB.localeCompare(dateA);
    });
    setNews(sortedNews);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [show]);

  const showAddModal = () => {
    setShow(true);
    console.log('clicked on Add');
  };

  const hideAddModal = () => {
    setShow(false);
    console.log('clicked on Add');
  };

  return (
    <main>
      <h2>Edit News</h2>
      {news.map((item) => (
        <NewsBrief key={item.id} news={item} headlineOnly={true} />
      ))}
      <S.Buttons>
        <Button variant="primary" onClick={showAddModal}>
          Add
        </Button>
      </S.Buttons>
      <AddNewsModal show={show} hideAddModal={hideAddModal} />
    </main>
  );
}

// Libraries
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Components
import NewsBrief from './NewsBrief';

// Styling
import Button from 'react-bootstrap/esm/Button';
import AddNewsModal from '../modals/AddNewsModal';

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
  };

  const hideAddModal = () => {
    setShow(false);
  };

  return (
    <main>
      <h2>Edit News</h2>
      {news.map((item) => (
        <NewsBrief key={item.id} news={item} headlineOnly={true} />
      ))}
      <div className='flex justify-center mt-4'>
        <Button variant="primary" onClick={showAddModal}>
          Add
        </Button>
      </div>
      <AddNewsModal show={show} hideAddModal={hideAddModal} />
    </main>
  );
}

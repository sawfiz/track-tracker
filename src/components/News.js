import React, { useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Components
import NewsBrief from './NewsBrief';

export default function News() {
  const newsCollection = collection(db, 'news');

  const [news, setNews] = useState([]);

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

  return (
    <div>
      <h2>News</h2>
      {news.map(
        (item) =>
          item.data().publish && (
            <NewsBrief key={item.id} news={item} headlineOnly={false} />
          )
      )}
    </div>
  );
}

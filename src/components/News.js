import React, { useContext, useState, useEffect } from 'react';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Components
import NewsItem from './NewsItem';

export default function News() {
  const newsCollection = collection(db, 'news');

  const [news, setNews] = useState([]);

  const fetchData = async () => {
    const docRefs = await getDocs(newsCollection);
    console.log("🚀 ~ file: News.js:20 ~ fetchData ~ docRefs:", docRefs.docs)
    const sortedNews = docRefs.docs.sort((a, b) => {
      const dateA = a.data().date;
      console.log("🚀 ~ file: News.js:22 ~ sortedNews ~ dateA:", dateA)
      const dateB = b.data().date;
      console.log("🚀 ~ file: News.js:24 ~ sortedNews ~ dateB:", dateB)
      return dateB > dateA;
    });
    setNews(sortedNews);
    console.log("🚀 ~ file: News.js:26 ~ fetchData ~ sortedNews:", sortedNews)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>News</h2>
      {news.map((item) => (
        <NewsItem key={item.id} news={item} headlineOnly={false}/>
      ))}
    </div>
  );
}

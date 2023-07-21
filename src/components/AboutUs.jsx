// Libraries
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

export default function AboutUs() {
  const aboutCollection = collection(db, 'about');

  const [about, setAbout] = useState({ text: '' });

  const fetchData = async () => {
    const docRefs = await getDocs(aboutCollection);
    if (!docRefs.empty) {
      const content = docRefs.docs[0];
      setAbout(content.data());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <main>
      <h2>About Us</h2>
      <p>
        {about.text}
      </p>
    </main>
  );
}

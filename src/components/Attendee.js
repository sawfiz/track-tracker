import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

export default function Attendee({ athlete }) {
  const [athleteName, setAthleteName] = useState([])

  const userCollection = collection(db, 'users');

  const getAthleteName = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    const athleteName = docSnapshot.data().name;
    setAthleteName(athleteName)
  };

  useEffect(() => {
    getAthleteName(athlete);
  }, []);

  return <div>{athleteName}</div>;
}

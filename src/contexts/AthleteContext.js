import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const AthleteContext = createContext();

export default function AthleteContextProvider(props) {
  const [athletes, setAthletes] = useState([]);

  const userCollection = collection(db, 'users');

  const getAthletes = async () => {
    const docRefs = await getDocs(userCollection);
    const snapshots = docRefs.docs.filter((doc) => {
      return doc.data().role === 'athlete';
    });
    setAthletes(snapshots);
  };

  const getAthleteName = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    const athleteName = docSnapshot.data().name;
    return athleteName;
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthletes,
        getAthleteName,
      }}
    >
      {props.children}
    </AthleteContext.Provider>
  );
}

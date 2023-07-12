import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const AthleteContext = createContext();

export default function AthleteContextProvider(props) {
  const [athletes, setAthletes] = useState([]);

  const userCollection = collection(db, 'users');

  const getAthletes = async () => {
    const docRefs = await getDocs(userCollection);
    const athletes = docRefs.docs.filter((doc) => {
      return doc.data().role === 'athlete';
    });
    const sortedAthletes = athletes.sort((a, b) =>
      a.data().name > b.data().name ? 1 : -1
    );
    setAthletes(sortedAthletes);
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

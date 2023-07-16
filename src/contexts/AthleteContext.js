import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const AthleteContext = createContext();

export default function AthleteContextProvider(props) {
  const [athletes, setAthletes] = useState([]);

  const userCollection = collection(db, 'users');

  const getAthletes = async (activeOnly = false) => {
    const docRefs = await getDocs(userCollection);
    const athletes = docRefs.docs.filter((doc) => {
      if (activeOnly) {
        return (
          doc.data().role === 'athlete' && doc.data().active === activeOnly
        );
      } else {
        return doc.data().role === 'athlete';
      }
    });
    const sortedAthletes = athletes.sort((a, b) =>
      a.data().name > b.data().name ? 1 : -1
    );
    setAthletes(sortedAthletes);
  };

  const getAthleteName = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    const name = docSnapshot.data().name;
    return name;
  };

  const getAthleteID = async (name) => {
    const docRefs = await getDocs(userCollection);
    const athletes = docRefs.docs.filter((doc) => {
      return doc.data().name === name;
    });
    return athletes[0].id;
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthletes,
        getAthleteName,
        getAthleteID,
      }}
    >
      {props.children}
    </AthleteContext.Provider>
  );
}

import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const ParentsContext = createContext();

export default function ParentsContextProvider(props) {
  const [parents, setParents] = useState([]);

  const parentsCollection = collection(db, 'users');

  const getParents = async (activeOnly = false) => {
    const docRefs = await getDocs(parentsCollection);
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

  const getParentName = async (id) => {
    const docSnapshot = await getDoc(doc(parentsCollection, id));
    const athleteName = docSnapshot.data().name;
    return athleteName;
  };

  return (
    <ParentsContext.Provider
      value={{
        parents,
        getParents,
        getParentName,
      }}
    >
      {props.children}
    </ParentsContext.Provider>
  )
}

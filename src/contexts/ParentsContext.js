import React, { createContext, useState, useContext } from 'react';
import { db } from '../config/firebase';
import { UserContext } from './UserContext';

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const ParentsContext = createContext();

export default function ParentsContextProvider(props) {
  const { getUserInfo } = useContext(UserContext);
  const userCollection = collection(db, 'users');

  const [parents, setParents] = useState([]);

  const getParents = async () => {
    const docRefs = await getDocs(userCollection);
    const list = docRefs.docs.filter((doc) => {
      return doc.data().role === 'parent';
    });
    const sortedList = list.sort((a, b) =>
      a.data().name > b.data().name ? 1 : -1
    );
    return sortedList;
  };

  const getParentName = (id) => {
    return getUserInfo(id).data().name;
  };

  const getChildren = async (id) => {
    const docRef =  doc(userCollection, id)
    const children = await getDoc(docRef)
    return children.data().children
  }

  return (
    <ParentsContext.Provider
      value={{
        parents,
        getParents,
        getParentName,
        getChildren,
      }}
    >
      {props.children}
    </ParentsContext.Provider>
  );
}

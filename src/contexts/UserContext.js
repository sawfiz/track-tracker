import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [userList, setUserList] = useState([]);

  const userCollection = collection(db, 'users');

  const checkUser = async (id) => {
    const user = await getDoc(doc(userCollection, id));
    if (user.exists()) {
      return true;
    } else {
      console.log('No such document');
      // use setDoc to specific an document ID
      // use addDoc to let Firestore choose ID for you
      const name = auth.currentUser.displayName;
      const email = auth.currentUser.email;
      await setDoc(doc(userCollection, id), { name, email });
      return false;
    }
  };

  const getUserInfo = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    const data = docSnapshot.data();
    setUserInfo(data);
  };

  const getUsers = async (role) => {
    const docRefs = await getDocs(userCollection);
    const snapshots = docRefs.docs.filter((doc) => {
      return doc.data().role === role;
    });
    setUserList(snapshots)
    // const data = snapshots.map((snapshot) => snapshot.data())
    // console.log("🚀 ~ file: UserContext.js:43 ~ filteredData ~ filteredData:", data)
    // setUserList(data);
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userId,
        setUserId,
        setUserInfo,
        checkUser,
        getUserInfo,
        userInfo,
        userList,
        getUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

// Libraries
import React, { createContext, useState } from 'react';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

// Config
import { db, auth } from '../config/firebase';

// Code
export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({});

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

  // This should be info of the logged in user
  // Sets the data in state
  const getUserInfo = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    const data = docSnapshot.data();
    setUserInfo(data);
  };

  // This should be info of the logged in user
  // Returns user data
  const getUserData = async (id) => {
    const docSnapshot = await getDoc(doc(userCollection, id));
    const data = docSnapshot.data();
    return data;
  };

  const updateUser = async (user, data) => {
    try {
      const docRef = doc(userCollection, user.id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const getUsersWithNoRoles = async () => {
    const docRefs = await getDocs(userCollection);
    const list = docRefs.docs.filter((doc) => {
        return !doc.data().role;
      }
    );
    const sortedList = list.sort((a, b) =>
      a.data().name > b.data().name ? 1 : -1
    );
    return sortedList;
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        setUserInfo,
        checkUser,
        getUserInfo,
        getUserData,
        userInfo,
        getUsersWithNoRoles,
        updateUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

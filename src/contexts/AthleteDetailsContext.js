import React, { createContext, useState, useContext } from 'react';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { AthleteContext } from './AthleteContext';

export const AthleteDetailsContext = createContext();

export default function AthleteDetailsContextProvider(props) {
  const {getAthletes} = useContext(AthleteContext)

  const [showAddModal, setShowAddModal] = useState(false);

    // Function to open/close the AddAthleteModal
    const openAddModal = () => {
      setShowAddModal(true);
    };
  
    const closeAddModal = () => {
      setShowAddModal(false);
      getAthletes();
    };
  
    const addAthlete = async (athlete) => {
      try {
        await addDoc(collection(db, 'users', athlete));
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };
  return (
    <AthleteDetailsContext.Provider value={{showAddModal, openAddModal, closeAddModal}}>
      {props.children}
    </AthleteDetailsContext.Provider>
  )
}

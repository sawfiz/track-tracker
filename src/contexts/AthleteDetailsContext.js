import React, { createContext, useState, useContext } from 'react';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { AthleteContext } from './AthleteContext';

export const AthleteDetailsContext = createContext();

export default function AthleteDetailsContextProvider(props) {
  const { getAthletes } = useContext(AthleteContext);
  const userCollection = collection(db, 'users');

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
      await addDoc(userCollection, athlete);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  return (
    <AthleteDetailsContext.Provider
      value={{ showAddModal, openAddModal, closeAddModal, addAthlete }}
    >
      {props.children}
    </AthleteDetailsContext.Provider>
  );
}

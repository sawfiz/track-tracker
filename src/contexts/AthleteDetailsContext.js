import React, { createContext, useState, useContext } from 'react';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import { AthleteContext } from './AthleteContext';

export const AthleteDetailsContext = createContext();

export default function AthleteDetailsContextProvider(props) {
  const { getAthletes } = useContext(AthleteContext);
  const userCollection = collection(db, 'users');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [athleteToEdit, setAthleteToEdit] = useState(null);

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

  // Function to open/close the EditBookModal
  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    getAthletes();
  };

  // Set bookToEdit when a book's edit button is clicked
  const editAthlete = (athlete) => {
    setAthleteToEdit(athlete);
    openEditModal();
  };

  // Function to handle changes in the EditBookModal
  const handleChange = (e) => {
    setAthleteToEdit({ ...athleteToEdit, [e.target.name]: e.target.value });
  };

  // const updateAthlete = async () => {
  //   try {
  //     const athleteDoc = doc(userCollection, athlete.id);
  //     const athleteData = { ...athlethToEdit };
  //     await updateDoc(athleteDoc, athleteData);
  //   } catch (error) {
  //     console.error('Error editing book:', error);
  //   }
  // };

  return (
    <AthleteDetailsContext.Provider
      value={{
        showAddModal,
        openAddModal,
        closeAddModal,
        addAthlete,
        showEditModal,
        editAthlete,
        closeEditModal,
      }}
    >
      {props.children}
    </AthleteDetailsContext.Provider>
  );
}

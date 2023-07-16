// Libaraies
import React, { createContext, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Code
export const AthleteContext = createContext();

export default function AthleteContextProvider(props) {
  // DB collection to use
  const userCollection = collection(db, 'users');

  // States
  const [athletes, setAthletes] = useState([]);
  const [athleteToEdit, setAthleteToEdit] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Set bookToEdit when an athlete's edit button is clicked
  const editAthlete = (athleteID) => {
    setAthleteToEdit(athleteID);
    openEditModal();
  };

  // Functions to open/close the AddAthleteModal
  const openAddModal = () => {
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    getAthletes();
  };

  // Functions to open/close the EditBookModal
  const openEditModal = () => {
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    getAthletes();
  };

  // Functions to get data from DB
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

  const getAthleteInfo = async (athlete) => {
    try {
      const docRef = doc(userCollection, athlete);
      const docDoc = await getDoc(docRef);
      const docData = docDoc.data();
      return docData;
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
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

  // Functions to modify data
  const addAthlete = async (athlete) => {
    try {
      await addDoc(userCollection, athlete);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateAthlete = async (athleteInfo) => {
    try {
      const athleteDoc = doc(userCollection, athleteToEdit);
      await updateDoc(athleteDoc, athleteInfo);
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const updateAthleteParent = async (athleteID, parentName, parentGender) => {
    try {
      const athleteDoc = doc(userCollection, athleteID);
      const athleteInfo = getAthleteInfo(athleteID);
      if (parentGender === 'Male') {
        const updatedInfo = { ...athleteInfo, father: parentName };
        await updateDoc(athleteDoc, updatedInfo);
        console.log('updated father');
      }
      if (parentGender === 'Female') {
        const updatedInfo = { ...athleteInfo, mother: parentName };
        await updateDoc(athleteDoc, updatedInfo);
        console.log('updated mother');
      }
      // console.log("updated mother");
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthletes,
        getAthleteName,
        getAthleteID,
        showAddModal,
        openAddModal,
        closeAddModal,
        addAthlete,
        showEditModal,
        editAthlete,
        closeEditModal,
        athleteToEdit,
        getAthleteInfo,
        updateAthlete,
        updateAthleteParent,
      }}
    >
      {props.children}
    </AthleteContext.Provider>
  );
}

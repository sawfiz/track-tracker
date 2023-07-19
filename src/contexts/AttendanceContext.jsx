// Libraries
import React, { createContext, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import startOfDay from 'date-fns/startOfDay';

// Config
import { db } from '../config/firebase';

// Code
export const AttendanceContext = createContext();

export default function AttendenceContextProvider(props) {
  // DB collection to use
  const attendanceCollection = collection(db, 'attendance');

  const getAttendance = async (date, stadium) => {
    try {
      const existingDocRef = await getDocs(
        query(attendanceCollection, where('date', '==', date))
      );
      if (!stadium) {
        return existingDocRef.docs[0].data();
      } else {
        const stadiumAttandees = existingDocRef.docs.filter(
          (d) => d.data().stadium === stadium
        );

        return stadiumAttandees[0].data();
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
      console.log('No record for ', date);
    }
  };

  const getAttendances = async () => {
    const docRefs = await getDocs(attendanceCollection);
    // Sort date in descending order
    const sortedAttendances = docRefs.docs.sort((a, b) => {
      const dateA = a.data().date;
      const dateB = b.data().date;
      return dateB.localeCompare(dateA);
    });
    return sortedAttendances;
  };

  return (
    <AttendanceContext.Provider value={{ getAttendance, getAttendances }}>
      {props.children}
    </AttendanceContext.Provider>
  );
}

import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import startOfDay from 'date-fns/startOfDay';

export const AttendanceContext = createContext();

export default function AttendenceContextProvider(props) {
  const [attendanceList, setAttendanceList] = useState([]);
  const [record, setRecord] = useState(null);

  const attendanceCollection = collection(db, 'attendance');

  const getAttendance = async (date) => {
    try {
      const existingDocRef = await getDocs(
        query(attendanceCollection, where('date', '==', startOfDay(date)))
      );
      setRecord(existingDocRef.docs[0].data());
    } catch (error) {
      setRecord(null);
      console.log('Error getting documents: ', error);
      console.log('No record for ', startOfDay(date));
    }
  };

  const getAttendances = async () => {
    const docRefs = await getDocs(attendanceCollection);
    // Sort date in descending order
    const sortedAttendances = docRefs.docs.sort((a, b) => {
      const dateA = a.data().date.toDate();
      const dateB = b.data().date.toDate();
      return dateB - dateA;
    });
    setAttendanceList(sortedAttendances);
  };

  return (
    <AttendanceContext.Provider
      value={{ record, attendanceList, getAttendance, getAttendances }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
}

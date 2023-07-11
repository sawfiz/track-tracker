import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  getDocs,
} from 'firebase/firestore';

export const AttendanceContext = createContext();

export default function AttendenceContextProvider( props ) {
  const [attendanceList, setAttendanceList] = useState([]);

  const attendanceCollection = collection(db, 'attendance');

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
    <AttendanceContext.Provider value={{ attendanceList, getAttendances }}>
      {props.children}
    </AttendanceContext.Provider>
  );
}

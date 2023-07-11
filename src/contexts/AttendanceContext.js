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
    console.log("🚀 ~ file: AttendanceContext.js:23 ~ getAttendances ~ docRefs:", docRefs.docs)
    setAttendanceList(docRefs.docs);
  };

  return (
    <AttendanceContext.Provider value={{ attendanceList, getAttendances }}>
      {props.children}
    </AttendanceContext.Provider>
  );
}

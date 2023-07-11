import React, { createContext, useState } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';

export const AttendanceContext = createContext();

export default function AttendenceContextProvider( props ) {
  const [attendanceList, setAttendanceList] = useState([]);

  const attendenceCollection = collection(db, 'attendence');

  const getAttendances = async () => {
    const docRefs = await getDocs(attendenceCollection);
    // const snapshots = docRefs.docs.filter((doc) => {
    //   return doc.data().role === role;
    // });
    setAttendanceList(docRefs.docs);
  };

  return (
    <AttendanceContext.Provider value={{ attendanceList, getAttendances }}>
      {props.children}
    </AttendanceContext.Provider>
  );
}

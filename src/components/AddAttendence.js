import React, { useState, useContext, useEffect } from 'react';
import startOfDay from 'date-fns/startOfDay';
import styled from 'styled-components';
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
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Athlete from './Athlete';

const S = {};
S.DateContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

S.ButtonContainer = styled.div`
  display: flex;
`;

S.Button = styled.button`
  margin: auto;
  padding: 0.3rem;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export default function AddAttendence() {
  useEffect(() => {
    getUsers('athlete');
  }, []);

  const { userList, getUsers } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendeeList, setAttendeeList] = useState([]);

  const addAttendee = (id) => {
    setAttendeeList([...attendeeList, id]);
    console.log(attendeeList);
  };

  const attendenceCollection = collection(db, 'attendance');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attendeeList.length) {
      const startOfSelectedDate = startOfDay(selectedDate)
      try {
        // Check if doc with the same date already exists
        const existingDocRef = await getDocs(
          query(
            collection(db, 'attendance'),
            where('date', '==', startOfSelectedDate)
          )
        );

        if (existingDocRef.docs.length > 0) {
          const overwrite = window.confirm(
            'A record with the same date already exists. Do you want to overwrite it?'
          );
          if (overwrite) {
            const data = { date: startOfSelectedDate, attendeeList };
            await setDoc(existingDocRef.docs[0].ref, data);
            console.log('Attendance record overwritten.');
          } else {
            const existingAttendeeList =
              existingDocRef.docs[0].data().attendeeList;
            const mergedAttendeeList = [
              ...existingAttendeeList,
              ...attendeeList,
            ];
            const data = { date: startOfSelectedDate, attendeeList: mergedAttendeeList };
            await updateDoc(existingDocRef.docs[0].ref, data);
            console.log('Attendance record merged.');
          }
        } else {
          const data = {
            date: startOfSelectedDate,
            attendees: attendeeList,
          };
          await addDoc(attendenceCollection, data);
          console.log('New attendance record added.');
          alert('New attendance record added.');
        }

        navigate('/admin');
      } catch (err) {
        console.log('Error adding or updating attendance', err.message);
      }
    } else {
      alert('Empty attendee list. Not submitted.');
    }
  };

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Add Attendence</h2>
      <form onSubmit={handleSubmit}>
        <S.DateContainer>
          <h3>Date</h3>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </S.DateContainer>
        <ul>
          {userList.map((athlete) => {
            return (
              <Athlete
                key={athlete.id}
                athlete={athlete}
                addAttendee={addAttendee}
              />
            );
          })}
        </ul>
        <S.ButtonContainer>
          <S.Button>Submit</S.Button>
        </S.ButtonContainer>
      </form>
    </main>
  );
}

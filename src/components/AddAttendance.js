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
import SubmitAttendanceModal from '../modals/SubmitAttendanceModal';

const S = {};
S.Container = styled.div`
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

export default function AddAttendance() {
  useEffect(() => {
    getUsers('athlete');
  }, []);

  const { userList, getUsers } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stadium, setStadium] = useState('')
  const [attendeeList, setAttendeeList] = useState([]);
  const [existingDoc, setExistingDoc] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const addAttendee = (id) => {
    setAttendeeList([...attendeeList, id]);
    console.log(attendeeList);
  };

  const attendenceCollection = collection(db, 'attendance');
  const navigate = useNavigate();
  const startOfSelectedDate = startOfDay(selectedDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attendeeList.length) {
      try {
        // Check if doc with the same date already exists
        const existingDocRef = await getDocs(
          query(
            collection(db, 'attendance'),
            where('date', '==', startOfSelectedDate)
          )
        );

        if (existingDocRef.docs.length > 0) {
          console.log('modal should show up now');
          setExistingDoc(existingDocRef.docs[0]);
          setIsOpen(true);
        } else {
          const data = {
            date: startOfSelectedDate,
            stadium,
            attendeeList,
          };
          await addDoc(attendenceCollection, data);
          console.log('New attendance record added.');
          alert('New attendance record added.');
        }

        // navigate('/admin');
      } catch (err) {
        console.log('Error adding or updating attendance', err.message);
      }
    } else {
      alert('Empty attendee list. Not submitted.');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  const handleOverwrite = async () => {
    const data = { date: startOfSelectedDate, stadium, attendeeList };
    await setDoc(existingDoc.ref, data);
    console.log('Attendance record overwritten.');
    navigate('/admin');
  };

  const handleMerge = async () => {
    const existingAttendeeList = existingDoc.data().attendeeList;
    const mergedAttendeeList = [...existingAttendeeList, ...attendeeList];
    const data = {
      date: startOfSelectedDate,
      stadium,
      attendeeList: mergedAttendeeList,
    };
    await updateDoc(existingDoc.ref, data);
    console.log('Attendance record merged.');
    navigate('/admin');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Add Attendance</h2>
      <form onSubmit={handleSubmit}>
        <S.Container>
          <h3>Date</h3>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </S.Container>
        <S.Container>
          <h3>Stadium</h3>
          <select onChange={(e)=>setStadium(e.target.value)}>
            <option>-</option>
            <option>Bukit Gombak</option>
            <option>Choa Chu Kang</option>
            <option>Clementi</option>
          </select>
        </S.Container>
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
          <S.Button onClick={handleCancel}>Cancel</S.Button>
        </S.ButtonContainer>
      </form>
      {isOpen && (
        <SubmitAttendanceModal
          isOpen={isOpen}
          handleClose={handleClose}
          handleOverwrite={handleOverwrite}
          handleMerge={handleMerge}
        />
      )}
    </main>
  );
}

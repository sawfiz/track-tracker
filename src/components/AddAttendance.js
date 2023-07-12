import React, { useState, useContext, useEffect } from 'react';
import startOfDay from 'date-fns/startOfDay';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
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
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

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
  justify-content: space-around;
`;

export default function AddAttendance() {
  useEffect(() => {
    getAthletes();
  }, []);

  const { athletes, getAthletes } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stadium, setStadium] = useState('');
  const [attendeeList, setAttendeeList] = useState([]);
  const [existingDoc, setExistingDoc] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const addAttendee = (id) => {
    setAttendeeList([...attendeeList, id]);
    console.log(attendeeList);
  };

  const removeAttendee = (id) => {
    setAttendeeList(attendeeList.filter((attendeeId) => attendeeId !== id));
    console.log(attendeeList);
  };

  const attendenceCollection = collection(db, 'attendance');
  const navigate = useNavigate();
  const startOfSelectedDate = startOfDay(new Date(selectedDate))

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attendeeList.length) {
      if (stadium) {
        try {
          // Check if doc with the same date already exists
          const existingDocRef = await getDocs(
            query(
              collection(db, 'attendance'),
              where('date', '==', startOfSelectedDate)
            )
          );

          if (existingDocRef.docs.length > 0) {
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
            navigate('/admin');
          }
        } catch (err) {
          console.log('Error adding or updating attendance', err.message);
        }
      } else {
        // alert('Please select a stadium.');
      }
    } else {
      alert('Please select attendees.');
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

    // Create a set with existing attendees
    const uniqueAttendeeSet = new Set(existingAttendeeList);

    // Add unique attendees from attendeeList to the set
    // The Set data structure automatically removes duplicates.
    attendeeList.forEach((attendee) => {
      uniqueAttendeeSet.add(attendee);
    });

    // Convert the set back to an array
    const mergedAttendeeList = Array.from(uniqueAttendeeSet);

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
      <h2>Track Attendance</h2>
      <form >
        <InputGroup className="mb-3">
          <InputGroup.Text required id="basic-addon1">Date</InputGroup.Text>
          <Form.Control
            type="date"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Stadium </InputGroup.Text>
          <Form.Select required onChange={(e) => setStadium(e.target.value)}>
            <option>-</option>
            <option>Bukit Gombak</option>
            <option>Choa Chu Kang</option>
            <option>Clementi</option>
          </Form.Select>
        </InputGroup>

        <ul>
          {athletes.map((athlete) => {
            return (
              <Athlete
                key={athlete.id}
                athlete={athlete}
                addAttendee={addAttendee}
                removeAttendee={removeAttendee}
              />
            );
          })}
        </ul>
        <S.ButtonContainer>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </S.ButtonContainer>
      </form>
      {isOpen && (
        <SubmitAttendanceModal
          show={isOpen}
          handleClose={handleClose}
          handleOverwrite={handleOverwrite}
          handleMerge={handleMerge}
        />
      )}
    </main>
  );
}

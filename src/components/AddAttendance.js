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
  updateDoc,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import Attendee from './Attendee';
import SubmitAttendanceModal from '../modals/SubmitAttendanceModal';
import { AttendanceContext } from '../contexts/AttendanceContext';
import { AthleteContext } from '../contexts/AthleteContext';

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

S.Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px dashed hotpink;
  padding: 0.5rem;
  margin: 1rem 0;
`;

export default function AddAttendance() {
  const { record, getAttendance } = useContext(AttendanceContext);
  const { athletes, getAthletes } = useContext(AthleteContext);

  // ^ Very import that selectedDate is initialize by calling a function
  // Not just `new Date()`
  // This way it is initialized only once upon rendering
  // Not getting a new value on each rerender
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [stadium, setStadium] = useState('');
  const [isStadiumEmpty, setIsStadiumEmpty] = useState(false);
  const [attendeeList, setAttendeeList] = useState([]);
  const [existingDoc, setExistingDoc] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // On initial rendering
  useEffect(() => {
    // Get data for today
    getAttendance(selectedDate);
    // Get athletes list
    getAthletes();
  }, []);

  // On user selecting a new date, get data
  useEffect(() => {
    getAttendance(selectedDate);
  }, [selectedDate]);

  // On there is a new record, update date
  useEffect(() => {
    console.log('🚀 ~ file: AddAttendance.js:76 ~ useEffect ~ record:', record);
    if (record) {
      setStadium(record.stadium);
      setAttendeeList([...record.attendeeList]);
      console.log(
        '🚀 ~ file: AddAttendance.js:77 ~ useEffect ~ record.attendeeList:',
        record.attendeeList
      );
    } else {
      setStadium('');
      setAttendeeList([]);
    }
    console.log(attendeeList);
  }, [record]);

  // Convert a Date to yyyy-mm-dd
  const convertDateForInput = (date) => {
    const options = {
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date
      .toLocaleDateString('en-GB', options)
      .split('/')
      .reverse()
      .join('-');
  };

  // if (record) {
  //   setStadium(record.stadium);
  // }

  // convert FireStore timestamp to javascript Date
  // let formattedDate = convertDateForInput(selectedDate);
  // if (record) {
  //   const timestamp = record.date;
  //   // Firestore stores in seconds, Javascript uses miliseconds
  //   const newDate = new Date(timestamp.seconds * 1000);
  //   formattedDate = convertDateForInput(newDate);
  // }

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
  const startOfSelectedDate = startOfDay(selectedDate);

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
        setIsStadiumEmpty(true);
      }
    } else {
      alert('Please select attendees.');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  // const handleOverwrite = async () => {
  //   const data = { date: startOfSelectedDate, stadium, attendeeList };
  //   await setDoc(existingDoc.ref, data);
  //   console.log('Attendance record overwritten.');
  //   navigate('/admin');
  // };

  const handleOverwrite = async () => {
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

  const handelChangeDate = (e) => {
    // selectDate is in javascript Date format
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Track Attendance</h2>
      <form>
        <InputGroup className="mb-3">
          <InputGroup.Text required id="basic-addon1">
            Date
          </InputGroup.Text>
          <Form.Control
            type="date"
            // value needs to be in yyyy-mm-dd format
            value={convertDateForInput(selectedDate)}
            onChange={handelChangeDate}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Stadium </InputGroup.Text>
          <Form.Select
            required
            isInvalid={isStadiumEmpty}
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
          >
            <option>-</option>
            <option value="Bukit Gombak">Bukit Gombak</option>
            <option value="Choa Chu Kang">Choa Chu Kang</option>
            <option value="Clmenti">Clementi</option>
          </Form.Select>
        </InputGroup>

        <S.Grid>
          {athletes.map((athlete) => {
            return (
              <Attendee
                key={athlete.id}
                attendeeList={attendeeList}
                athlete={athlete}
                addAttendee={addAttendee}
                removeAttendee={removeAttendee}
              />
            );
          })}
        </S.Grid>
        <S.ButtonContainer>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
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
          // handleMerge={handleMerge}
        />
      )}
    </main>
  );
}

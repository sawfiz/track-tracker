// Libraries
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import styled from 'styled-components';

// Config
import { db } from '../config/firebase';

// Styling
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// Components
import Attendee from './Attendee';
import { AttendanceContext } from '../contexts/AttendanceContext';
import { AthleteContext } from '../contexts/AthleteContext';

// Modal
import SubmitAttendanceModal from '../modals/SubmitAttendanceModal';

const S = {
  Container: styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
  `,
  Grid: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px dashed hotpink;
    padding: 0.5rem;
    margin: 1rem 0;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: space-around;
  `,
};

// Code
export default function AddAttendance() {
  // Contexts
  const { getAttendance } = useContext(AttendanceContext);
  const { athletes, getAthletes } = useContext(AthleteContext);

  // DB collection to use
  const attendenceCollection = collection(db, 'attendance');
  const navigate = useNavigate();

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

  // States
  const [today, setToday] = useState(() => convertDateForInput(new Date()));
  const [record, setRecord] = useState({
    date: today,
    stadium: '',
    attendeeList: [],
  });
  const { date, stadium, attendeeList } = record;

  const [isStadiumEmpty, setIsStadiumEmpty] = useState(false);
  const [existingDoc, setExistingDoc] = useState(null);
  // Show submit confirmation modal
  const [show, setShow] = useState(false);

  const fetchDataInit = async () => {
    const data = await getAttendance(date);
    if (data) {
      setRecord(data);
    }
  };

  const fetchDataOnChange = async (day, std) => {
    const data = await getAttendance(day, std);
    if (data) {
      setRecord(data);
    } else {
      setRecord((prev) => ({ ...prev, attendeeList: [] }));
    }
  };

  // On initial rendering
  useEffect(() => {
    fetchDataInit();
    getAthletes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date') fetchDataOnChange(value); // value is the new date
    if (name === 'stadium') fetchDataOnChange(date, value); // value is the new stadium
    setRecord((prev) => ({ ...prev, [name]: value }));
  };

  const addAttendee = (id) => {
    setRecord({ ...record, attendeeList: [...attendeeList, id] });
  };

  const removeAttendee = (id) => {
    const filteredList = attendeeList.filter((attendeeId) => attendeeId !== id);
    setRecord({ ...record, attendeeList: filteredList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attendeeList.length) {
      if (stadium) {
        try {
          // Check if docs with the same date already exist
          const existingDocRef = await getDocs(
            query(attendenceCollection, where('date', '==', date))
          );

          // Identify the doc that has the same stadium
          let recordExists = false;
          if (existingDocRef.docs.length > 0) {
            existingDocRef.forEach((docRef) => {
              if (docRef.data().stadium === stadium) {
                setExistingDoc(docRef);
                recordExists = true;
              }
            });
          }

          // if (existingDocRef.docs.length > 0 && existingDocRef.docs[0].data().stadium === stadium) {
          if (recordExists) {
            setShow(true);
          } else {
            await addDoc(attendenceCollection, record);
            alert('New attendance record added.');
            navigate('/admin');
          }
        } catch (err) {
          console.log('Error adding or updating attendance', err.message);
        }
      } else {
        setIsStadiumEmpty(true);
      }
    } else {
      alert('Please select attendees.');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  const handleOverwrite = async () => {
    const data = { date, stadium, attendeeList };
    await setDoc(existingDoc.ref, data);
    console.log('Attendance record overwritten.');
    navigate('/admin');
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <main>
      <p>
        <Link to="/admin">Admin Tools</Link>
      </p>
      <h2>Track Attendance</h2>
      <form>
        <InputGroup className="mb-3">
          <InputGroup.Text required id="basic-addon1">
            Date
          </InputGroup.Text>
          <Form.Control
            type="date"
            name="date"
            // value needs to be in yyyy-mm-dd format
            value={date}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Stadium </InputGroup.Text>
          <Form.Select
            required
            isInvalid={isStadiumEmpty}
            name="stadium"
            value={stadium}
            onChange={handleChange}
          >
            <option></option>
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
      <SubmitAttendanceModal
        show={show}
        handleClose={handleClose}
        handleOverwrite={handleOverwrite}
      />
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

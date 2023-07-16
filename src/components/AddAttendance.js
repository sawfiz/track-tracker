// Libraries
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import startOfDay from 'date-fns/startOfDay';
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
  // const { record, getAttendance } = useContext(AttendanceContext);
  const { athletes, getAthletes } = useContext(AthleteContext);

  // DB collection to use
  const attendenceCollection = collection(db, 'attendance');
  const navigate = useNavigate();

  // States
  // ^ Very import that selectedDate is initialize by calling a function
  // Not just `new Date()`
  // This way it is initialized only once upon rendering
  // Not getting a new value on each rerender
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const startOfSelectedDate = startOfDay(selectedDate);
  // Data
  const [record, setRecord] = useState({date:'', stadium:'', attendeeList:[]});
  const { date, stadium, attendeeList } = record;

  const [isStadiumEmpty, setIsStadiumEmpty] = useState(false);
  const [existingDoc, setExistingDoc] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    const data = await getAttendance(selectedDate);
    console.log('🚀 ~ file: AddAttendance.js:72 ~ fetchData ~ data:', data);
    if (data) {
      setRecord(data);
    } else {
      setRecord({ date: '', stadium: '', attendeeList: [] });
    }
  };

  // On initial rendering
  useEffect(() => {
    fetchData();
    getAthletes();
  }, []);

  // On user selecting a new date, get data of that day
  useEffect(() => {
    fetchData();
  }, [selectedDate]);

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

  const handelChangeDate = (e) => {
    // selectDate is in javascript Date format
    setSelectedDate(new Date(e.target.value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };
  
  const addAttendee = (id) => {
    setRecord({ ...record, attendeeList: [...attendeeList, id] });
    console.log(attendeeList);
  };
  
  const removeAttendee = (id) => {
    const filteredList = attendeeList.filter((attendeeId) => attendeeId !== id);
    setRecord({ ...record, attendeeList: filteredList });
    console.log(attendeeList);
  };
  
  // ! ------------------
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
            console.log("🚀 ~ file: AddAttendance.js:158 ~ handleSubmit ~ data:", data)
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
            name="stadium"
            value={stadium}
            onChange={handleChange}
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
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

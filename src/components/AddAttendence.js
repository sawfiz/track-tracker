import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
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
  
  const attendenceCollection = collection(db, 'attendence');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attendeeList.length) {
      try {
      const data = { selectedDate, attendeeList };
      await addDoc(attendenceCollection, data)
      navigate('/admin');
      } catch (err) {
        console.log('Error adding attendence', err.message);
      }
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

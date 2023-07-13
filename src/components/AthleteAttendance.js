import React, { useContext, useEffect, useState } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';
import Attendance from './Attendance';
import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px dashed hotpink;
`;

export default function AthleteAttendance({ athleteID }) {
  const { getAttendances } = useContext(AttendanceContext);

  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const fetchData = async () => {
    const data = await getAttendances();
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      const filteredAttendance = list.filter((doc) =>
        doc.data().attendeeList.includes(athleteID)
      );
      setFilteredList(filteredAttendance);
    }
  }, [list]);

  return (
    <S.Container>
      {filteredList.map((attendance) => {
        return (
          <Attendance
            key={attendance.id}
            attendance={attendance}
            showNames={false}
          />
        );
      })}
    </S.Container>
  );
}

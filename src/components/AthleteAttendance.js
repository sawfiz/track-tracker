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

  const [attendances, setAttendances] = useState([]);

  const fetchData = async () => {
    const list = await getAttendances();
    const filteredList = list.filter((doc) =>
      doc.data().attendeeList.includes(athleteID)
    );
    setAttendances(filteredList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Container>
      {attendances.map((attendance) => {
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

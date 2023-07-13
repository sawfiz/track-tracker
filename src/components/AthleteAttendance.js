import React, { useContext, useEffect, useState } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';
import Attendance from './Attendance';
import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  margin: 0 0 1rem 1rem;
  border: 1px dashed hotpink;
`;

export default function AthleteAttendance({ athleteID }) {
  const { getAttendances } = useContext(AttendanceContext);

  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getAttendances();
      setAttendances(list);
    };
    fetchData();
  }, []);

  const filteredList = attendances.filter((doc) =>
    doc.data().attendeeList.includes(athleteID)
  );

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

import React, { useContext, useEffect, useState } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';
import Attendance from './Attendance';

export default function ShowAttendance() {
  const { getAttendances } = useContext(AttendanceContext);

  const [list, setList] = useState([]);

  const fetchData = async () => {
    const data = await getAttendances();
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Show Attendance</h2>
      <ul>
        {list.map((attendance) => {
          return (
            <Attendance
              key={attendance.id}
              attendance={attendance}
              showNames={true}
            />
          );
        })}
      </ul>
    </main>
  );
}

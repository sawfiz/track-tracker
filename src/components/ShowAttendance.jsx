// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { AttendanceContext } from '../contexts/AttendanceContext';

// Components
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
        <Link to="/admin">Admin Tools</Link>
      </p>
      <h2>Show Attendance</h2>
      {list.map((attendance) => {
        return (
          <Attendance
            key={attendance.id}
            attendance={attendance}
            showNames={true}
          />
        );
      })}
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

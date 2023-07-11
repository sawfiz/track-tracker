import React, { useContext, useEffect } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';
import Attendance from './Attendance';

export default function ShowAttendance() {
  const { attendanceList, getAttendances } = useContext(AttendanceContext);

  useEffect(() => {
    getAttendances();
  }, []);

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Show Attendance</h2>
      <ul>
        {attendanceList.map((attendance) => {
          return <Attendance key={attendance.id} attendance={attendance} />;
        })}
      </ul>
    </main>
  );
}

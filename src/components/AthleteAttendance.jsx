// Libraries
import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { AttendanceContext } from '../contexts/AttendanceContext';

// Components
import Attendance from './Attendance';

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
    <div className="outline-2 outline-pink-300 outline-dashed p-2 mb-2">
      {filteredList.map((attendance) => {
        return (
          <Attendance
            key={attendance.id}
            attendance={attendance}
            showNames={false}
          />
        );
      })}
    </div>
  );
}

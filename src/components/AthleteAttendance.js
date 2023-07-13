import React, { useContext, useEffect, useState } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';
import Attendance from './Attendance';


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
    <ul>
        {filteredList.map((attendance) => {
          return <Attendance key={attendance.id} attendance={attendance} showNames={false}/>;
        })}
    </ul>
  );
}

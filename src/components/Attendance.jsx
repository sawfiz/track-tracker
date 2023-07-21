// Libraries
import React from 'react';

// Components
import AthleteName from './AthleteName';

export default function Attendance({ attendance, showNames }) {
  const date = attendance.data().date;
  const stadium = attendance.data().stadium;
  const attendees = attendance.data().attendeeList;

  return (
    <>
      {showNames ? (
        // When rendering in ShowAttendances
        <div className='outline-dashed outline-2 outline-pink-300 my-3 p-1'>
          <div className='grid grid-cols-2 '>
            <div style={{ fontWeight: 'bold' }}>{date}</div>{' '}
            <div style={{ fontStyle: 'italic' }}>{stadium}</div>
          </div>
          {/* Render the following if need names of the attendees */}
          <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4">
            {showNames &&
              attendees.map((id) => <AthleteName key={id} id={id} />)}
          </div>
        </div>
      ) : (
        // When rendering in AthleteAttendance
        <div className='grid grid-cols-2'>
          <div style={{ fontWeight: 'bold' }}>{date}</div>
          <div style={{ fontStyle: 'italic' }}>{stadium}</div>
        </div>
      )}
    </>
  );
}

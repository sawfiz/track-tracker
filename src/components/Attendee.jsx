// Libraries
import React, { useState, useEffect } from 'react';

export default function Attendee({
  athlete,
  attendeeList,
  addAttendee,
  removeAttendee,
}) {
  const [isChecked, setIsChecked] = useState(false);

  // Perhaps attendeeList is updated after the initial rendering
  useEffect(() => {
    setIsChecked(attendeeList.includes(athlete.id));
  }, [attendeeList]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
      addAttendee(athlete.id);
    } else {
      setIsChecked(false);
      removeAttendee(athlete.id);
    }
  };

  return (
    <div className='m-1'>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />{' '}
      {athlete.data().name}
    </div>
  );
}

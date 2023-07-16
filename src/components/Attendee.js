import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const S = {
  Li : styled.div`
  margin: 0.2rem;
  `,
};

export default function Attendee({
  athlete,
  attendeeList,
  addAttendee,
  removeAttendee,
}) {
  console.log("🚀 ~ file: Attendee.js:16 ~ attendeeList:", attendeeList)
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
    <S.Li>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />{' '}
      {athlete.data().name}
    </S.Li>
  );
}

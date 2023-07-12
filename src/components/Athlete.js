import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const S = {};
S.Li = styled.div`
  list-style: none;
  margin: 0.2rem;
`;
export default function Athlete({
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
    <S.Li>
      <input type="checkbox" checked={isChecked} onChange={handleChange} />{' '}
      {athlete.data().name}
    </S.Li>
  );
}

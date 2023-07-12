import React, {useState} from 'react';
import styled from 'styled-components';

const S = {};
S.Li = styled.div`
  list-style: none;
  margin: 0.2rem;
`;
export default function Athlete({ athlete, attendeeList, addAttendee, removeAttendee }) {
  const [isChecked, setIsChecked] = useState(attendeeList?.includes(athlete.id));

  
  const handleChange = (e) => {
    if (e.target.checked) {
      addAttendee(athlete.id);
    } else {
      removeAttendee(athlete.id);
    }
  };

  // const isChecked = attendeeList ? attendeeList.includes(athlete.id) : false;

  return (
    <S.Li>
      <input type="checkbox" checked={isChecked} onChange={handleChange} /> {athlete.data().name}
    </S.Li>
  );
}

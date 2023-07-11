import React from 'react';
import styled from 'styled-components';
import Attendee from './Attendee';

const S = {};
S.Li = styled.li`
  list-style: none;
  margin: 1rem 0;
`;
export default function Attendance({ attendance }) {

  return <S.Li>
    {attendance.data().date.toDate().toDateString()} 
    {attendance.data().attendees.map((athlete)=> <Attendee key={athlete} athlete={athlete} />)}
    </S.Li>;
}

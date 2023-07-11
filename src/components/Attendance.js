import React from 'react';
import styled from 'styled-components';
import Attendee from './Attendee';

const S = {};
S.Li = styled.li`
  list-style: none;
  margin: 1rem 0;
`;
export default function Attendance({ attendance }) {
  const date = attendance.data().date.toDate().toDateString();
  const stadium = attendance.data().stadium
  const attendees = attendance.data().attendeeList;
  console.log("🚀 ~ file: Attendance.js:13 ~ Attendance ~ attendees:", attendees)

  return (
    <S.Li>
      {date}
      {' '}
      {stadium}
      {attendees.map((athlete) => (
        <Attendee key={athlete} athlete={athlete} />
      ))}
    </S.Li>
  );
}

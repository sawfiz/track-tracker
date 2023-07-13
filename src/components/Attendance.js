import React from 'react';
import styled from 'styled-components';
import AthleteName from './AthleteName';

const S = {};
S.Li = styled.li`
  list-style: none;
  margin: 1rem 0;
`;
export default function Attendance({ attendance, showNames }) {

  const date = attendance.data().date.toDate().toDateString();
  const stadium = attendance.data().stadium;
  const attendees = attendance.data().attendeeList;

  return (
    <S.Li>
      {date} {stadium}
      {/* Render the follow if need names of the attendees */}
      {showNames && attendees.map((athlete) => (
        <AthleteName key={athlete} athlete={athlete} />
      ))}
    </S.Li>
  );
}

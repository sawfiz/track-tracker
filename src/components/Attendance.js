import React from 'react';
import styled from 'styled-components';
import AthleteName from './AthleteName';

const S = {};
S.Attdendance = styled.div`
  margin-bottom: 1rem;
`;
S.Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
S.Heading = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px hotpink dashed;
`;
S.Heading2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function Attendance({ attendance, showNames }) {
  const date = attendance.data().date;
  const stadium = attendance.data().stadium;
  const attendees = attendance.data().attendeeList;

  return (
    <>
      {showNames ? ( 
        // When rendering in ShowAttendances
        <S.Attdendance>
          <S.Heading>
            <div style={{ fontWeight: 'bold' }}>{date}</div>{' '}
            <div style={{ fontStyle: 'italic' }}>{stadium}</div>
          </S.Heading>
          {/* Render the following if need names of the attendees */}
          <S.Item>
            {showNames &&
              attendees.map((id) => (
                <AthleteName key={id} id={id} />
              ))}
          </S.Item>
        </S.Attdendance>
      ) : (
        // When rendering in AthleteAttendance
        <S.Heading2>
          <div style={{ fontWeight: 'bold' }}>{date}</div>
          <div style={{ fontStyle: 'italic' }}>{stadium}</div>
        </S.Heading2>
      )}
    </>
  );
}

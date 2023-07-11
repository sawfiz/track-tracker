import React from 'react'
import styled from 'styled-components';

const S = {}
S.Li = styled.li`
list-style: none;
margin: 1rem 0;
`
export default function Athlete({athlete, addAttendee, removeAttendee}) {

  const handleChange = (e) => {
    if (e.target.checked) {
    addAttendee(athlete.id)
    } else {
      removeAttendee(athlete.id)
    }
  }
  
  return (
    <S.Li>
      <input type='checkbox' onChange={handleChange}/>
      {' '}
      {athlete.data().name}
      </S.Li>
  )
}

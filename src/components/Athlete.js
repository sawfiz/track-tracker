import React, { useContext, useEffect, useState } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';
import Button from 'react-bootstrap/esm/Button';
import styled from 'styled-components';

const S = {};

S.Athlete = styled.div`
  display: flex;
  justify-content: space-between;
  /* position: relative; */
  border: 1px dashed hotpink;
  padding: 0.2rem 0.5rem;
  height: 1.8rem;

  &:hover Button {
    display: block;
  }
`;

S.EditButton = styled.button`
  display: none;
  /* position: absolute; */
  right: 0;
`;

export default function Athlete({ athleteID }) {
  const { getAthleteName } = useContext(AthleteContext);
  const [athleteName, setAthleteName] = useState('');

  useEffect(() => {
    const fetchAthleteName = async () => {
      const name = await getAthleteName(athleteID);
      setAthleteName(name);
    };
    fetchAthleteName();
  }, []);

  return (
    <S.Athlete>
      {athleteName} <S.EditButton>✍️</S.EditButton>
    </S.Athlete>
  );
}

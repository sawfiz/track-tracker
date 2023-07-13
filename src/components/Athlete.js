import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AthleteContext } from '../contexts/AthleteContext';
import styled from 'styled-components';

const S = {};

S.Athlete = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 1px dashed hotpink;
  padding: 0.2rem 0.5rem;
  height: 1.8rem;
  background-color: #0000;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

S.EditButton = styled.button`
  display: none;
  right: 0;
`;

export default function Athlete({ athleteID }) {
  const { getAthleteName } = useContext(AthleteContext);
  const [athleteName, setAthleteName] = useState('');

  const fetchAthleteName = async () => {
    const name = await getAthleteName(athleteID);
    setAthleteName(name);
  };

  useEffect(() => {
    fetchAthleteName();
  }, []);

  return (
    <Link
      to={`/athletes/${athleteID}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <S.Athlete>{athleteName}</S.Athlete>
    </Link>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AthleteContext } from '../contexts/AthleteContext';
import styled from 'styled-components';

const S = {};

S.Athlete = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px dashed hotpink;
  padding: 0.2rem 0.5rem;
  height: 1.8rem;
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
    <S.Athlete>
      <Link
        to={`/athletes/${athleteID}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        {athleteName}
      </Link>
    </S.Athlete>
  );
}

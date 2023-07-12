import React, { useContext, useEffect, useState } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import styled from 'styled-components';
import EditAthleteModal from '../modals/EditAthleteModal';

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
  const { showEditModal, editAthlete } = useContext(AthleteDetailsContext);
  const [athleteName, setAthleteName] = useState('');

  useEffect(() => {
    const fetchAthleteName = async () => {
      const name = await getAthleteName(athleteID);
      setAthleteName(name);
    };
    fetchAthleteName();
  }, []);

  const handleClick = () => {
    editAthlete(athleteID);
  };

  return (
    <div>
      <S.Athlete>
        {athleteName} <S.EditButton onClick={handleClick}>✍️</S.EditButton>
      </S.Athlete>
      {showEditModal && <EditAthleteModal show={showEditModal}/>}
    </div>
  );
}

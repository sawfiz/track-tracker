import React, { useContext, useEffect } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';
import Athlete from './Athlete';
import AddAthleteModal from '../modals/AddAthleteModal';
import EditAthleteModal from '../modals/EditAthleteModal';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';

const S = {};
S.AthletesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 1rem 0;
`;

export default function ManageAthletes() {
  const { athletes, getAthletes } = useContext(AthleteContext);
  const { showAddModal, openAddModal } = useContext(
    AthleteDetailsContext
  );
  const { showEditModal } = useContext(AthleteDetailsContext);

  useEffect(() => {
    getAthletes();
  }, []);

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Manage Athletes</h2>
      <S.AthletesGrid>
        {/* athletes is an array of document snapshots
        Need to pass in athlete.id to retrieve names */}
        {athletes.map((athlete) => {
          return <Athlete key={athlete.id} athleteID={athlete.id} />;
        })}
      </S.AthletesGrid>
      <button onClick={openAddModal}>Add an athlete</button>
      {showAddModal && <AddAthleteModal show={showAddModal} />}
      {showEditModal && (
        <EditAthleteModal show={showEditModal} />
      )}
    </main>
  );
}

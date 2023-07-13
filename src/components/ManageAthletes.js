import React, { useContext, useEffect, useState } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';
import Athlete from './Athlete';
import AddAthleteModal from '../modals/AddAthleteModal';
import EditAthleteModal from '../modals/EditAthleteModal';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const S = {};
S.AthletesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 1rem 0;
`;

export default function ManageAthletes() {
  const { athletes, getAthletes } = useContext(AthleteContext);
  const { showAddModal, openAddModal } = useContext(AthleteDetailsContext);
  const { showEditModal } = useContext(AthleteDetailsContext);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getAthletes();
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  // Filter athletes based on searchText
  const filteredAthletes = athletes.filter((athlete) =>
    athlete.data().name.toLowerCase().includes(searchText)
  );

  // Render the Athlete components
  const athleteComponents = filteredAthletes.map((athlete) => (
    <Athlete key={athlete.id} athleteID={athlete.id} />
  ));

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Manage Athletes</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          placeholder="Name"
          value={searchText}
          onChange={handleSearch}
        />
      </InputGroup>

      <S.AthletesGrid>
        {athleteComponents}
        {/* athletes is an array of document snapshots
        Need to pass in athlete.id to retrieve names */}
        {/* {athletes.map((athlete) => {
          return <Athlete key={athlete.id} athleteID={athlete.id} />;
        })} */}
      </S.AthletesGrid>
      <Button onClick={openAddModal}>Add an athlete</Button>
      {showAddModal && <AddAthleteModal show={showAddModal} />}
      {showEditModal && <EditAthleteModal show={showEditModal} />}
    </main>
  );
}

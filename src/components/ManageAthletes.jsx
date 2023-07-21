// Libraries
import React, { useContext, useEffect, useState } from 'react';
// Contexts

import { AthleteContext } from '../contexts/AthleteContext';

// Components
import Athlete from './Athlete';

// Modals
import AddAthleteModal from '../modals/AddAthleteModal';

// Styling
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ManageAthletes() {
  const { athletes, getAthletes } = useContext(AthleteContext);
  const { showAddModal, openAddModal } = useContext(AthleteContext);

  const [activeOnly, setActiveOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState('Male & Female');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getAthletes();
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearchText(text);
  };

  // Filter athletes based on searchText, activeOnly and selectedGender
  const filteredAthletes = athletes.filter((athlete) => {
    const { name, gender, active } = athlete.data();
    if (activeOnly) {
      return (
        name.toLowerCase().includes(searchText) &&
        selectedGender.includes(gender) &&
        active === activeOnly
      );
    } else {
      return (
        name.toLowerCase().includes(searchText) &&
        selectedGender.includes(gender)
      );
    }
  });

  // Render the Athlete components
  const athleteComponents = filteredAthletes.map((athlete) => (
    <Athlete key={athlete.id} athleteID={athlete.id} small={true} />
  ));

  return (
    <main>
      <h2>Manage Athletes</h2>
      <Button onClick={openAddModal} style={{ margin: '1rem 0' }}>
        Add an athlete
      </Button>

      <InputGroup className="mb-3">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          autoFocus
          placeholder="Name"
          value={searchText}
          onChange={handleSearch}
        />
      </InputGroup>

      <div className="flex justify-around my-3">
        <div>
          <input
            type="checkbox"
            onChange={(e) => setActiveOnly(e.target.checked)}
          />{' '}
          <span className="text-slate-800">Active only </span>
        </div>
        <div>
          <select type="" onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="Male Female">Boys & Girls</option>
            <option value="Male">Boys</option>
            <option value="Female">Girls</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4">
        {athleteComponents}
      </div>

      {showAddModal && <AddAthleteModal show={showAddModal} />}
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

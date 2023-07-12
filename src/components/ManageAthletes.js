import React, { useContext, useEffect, useState } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';
import AthleteName from './AthleteName';
import AddAthleteModal from '../modals/AddAthleteModal';

export default function ManageAthletes() {
  const { athletes, getAthletes } = useContext(AthleteContext);
  console.log(
    '🚀 ~ file: ManageAthletes.js:8 ~ ManageAthletes ~ athletes:',
    athletes
  );

  useEffect(() => {
    getAthletes();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Manage Athletes</h2>
      <ul>
        {/* athletes is an array of document snapshots
        Need to pass in athlete.id to retrieve names */}
        {athletes.map((athlete) => {
          return <AthleteName key={athlete.id} athlete={athlete.id} />;
        })}
      </ul>
      <button onClick={() => setIsOpen(true)}>Add an athlete</button>
      {isOpen && <AddAthleteModal show={isOpen} handleClose={closeModal} />}
    </main>
  );
}

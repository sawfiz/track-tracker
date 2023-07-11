import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import Athlete from './Athlete';
import AddAthleteModal from '../modals/AddAthleteModal';

export default function ManageAthletes() {
  const { athletes, getAthletes } = useContext(UserContext);

  useEffect(() => {
    getAthletes();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <main>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h2>Manage Athletes</h2>
      <ul>
        {athletes.map((athlete) => {
          return <Athlete key={athlete.id} athlete={athlete} />;
        })}
      </ul>
      <button onClick={() => setIsOpen(true)}>Add an athlete</button>
      {isOpen && <AddAthleteModal isOpen={isOpen} closeModal={closeModal}/>}
    </main>
  );
}

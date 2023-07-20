// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

//Context
import { UserContext } from '../contexts/UserContext';

// Components
import Note from './Note';
import AddNotesModal from '../modals/AddNotesModal';

// Styling
import Button from 'react-bootstrap/esm/Button';
import styled from 'styled-components';

const S = {};

S.Container = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px dashed hotpink;
`;

S.ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 1rem;
`;

export default function AthleteNotes({ athleteID }) {
  const { userInfo } = useContext(UserContext);
  const allowEditing = ['admin', 'coach'].includes(userInfo.role);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const notesCollection = collection(db, 'users', athleteID, 'notes');
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    const docRefs = await getDocs(notesCollection);
    const sortedDocs = docRefs.docs.sort((a, b) =>
      b.data().date > a.data().date ? 1 : -1
    );
    setNotes(sortedDocs);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [showNotesModal]);

  const handleClick = () => {
    setShowNotesModal(true);
  };

  const closeNotesModal = () => {
    setShowNotesModal(false);
  };

  return (
    <>
      <S.Container>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </S.Container>

      {allowEditing && (
        <>
          <S.ButtonContainer>
            <Button onClick={handleClick}>Add a Note</Button>
          </S.ButtonContainer>
          <AddNotesModal
            show={showNotesModal}
            closeNotesModal={closeNotesModal}
            athleteID={athleteID}
          />
        </>
      )}
    </>
  );
}

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
      <div className="outline-dashed outline-2 outline-pink-300 p-2 mb-2">
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>

      {allowEditing && (
        <>
          <div className="flex justify-end">
            <Button onClick={handleClick}>Add a Note</Button>
          </div>
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

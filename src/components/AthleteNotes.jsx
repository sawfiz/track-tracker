// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

//Context
import { UserContext } from '../contexts/UserContext';

// Components
import AddNotesModal from '../modals/AddNotesModal';
import withModalForm from './withModalForm';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function AthleteNotes({ athleteID }) {
  const { userInfo } = useContext(UserContext);
  const allowEditing = ['admin', 'coach'].includes(userInfo.role);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  // Use HOC
  // const openModal = () => {
  //   console.log('opening...');
  //   setShowModal(true);
  // };
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  // Component to trigger the modal form
  const TriggerModalButton = ({ openModal, label }) => {
    return <button onClick={openModal}>{label}</button>;
  };

  // Configuration for the input elements
  const inputConfig = [
    {
      name: 'date',
      type: 'date',
      label: 'Date Input',
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Textarea Input',
      rows: 5,
    },
  ];

  const CollectionVariable = 'myCollection'; // Replace 'myCollection' with your Firebase collection name
  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    CollectionVariable
  );

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
            <Button>
              <EnhancedModalForm
                label="Add a Note"
                cancelLabel="Cancel"
                saveLabel="Save"
              />
            </Button>
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

function Note({ note }) {
  return (
    <div>
      {note.data().date} {note.data().note}
    </div>
  );
}

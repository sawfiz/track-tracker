// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

//Context
import { UserContext } from '../contexts/UserContext';

// Components
import withModalForm from './withModalForm';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function AboutUs() {
  const { userInfo } = useContext(UserContext);
  const allowEditing = ['admin', 'coach'].includes(userInfo.role);

  const myCollection = collection(db, 'about');

  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState(null);

  const fetchData = async () => {
    const docRefs = await getDocs(myCollection);
    if (!docRefs.empty) {
      const document = docRefs.docs[0];
      setInitialData(document);
    }
  };

  // Fetch data on initial render and when modal close to update initialData state
  useEffect(() => {
    if (!showModal) fetchData();
  }, [showModal]);

  // Component to trigger the modal form
  const TriggerModalButton = ({ openModal, label }) => {
    return <button onClick={openModal}>{label}</button>;
  };

  // Configuration for the input elements
  const inputConfig = [
    {
      name: 'text',
      type: 'textarea',
      label: 'Textarea Input',
      placeholder: 'Write about us here...',
      required: true,
      rows: 15,
    },
  ];

  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    myCollection
  );

  return (
    <main>
      <h2>About Us</h2>
      <p>{initialData ? initialData.data().text : ' '}</p>
      {allowEditing && (
        <div className='flex justify-center'>
          <Button variant="primary">
            <EnhancedModalForm
              showModal={showModal}
              setShowModal={setShowModal}
              label="Edit"
              title="About Us"
              cancelLabel="Cancel"
              saveLabel="Save"
              initialData={initialData}
            />
          </Button>
        </div>
      )}
    </main>
  );
}

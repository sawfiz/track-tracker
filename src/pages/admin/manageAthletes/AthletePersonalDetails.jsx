// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';

// Config
import { db } from '../../../config/firebase';

// Contexts
import { AthleteContext } from '../../../contexts/AthleteContext';

// Components
import withModalForm from '../../../components/withModalForm';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function AthletePersonalDetails({
  id,
  showModal,
  setShowModal,
}) {
  const { getAthleteInfo } = useContext(AthleteContext);

  const myCollection = collection(db, 'users');
  const [initialData, setInitialData] = useState(null);
  const athleteInfo = initialData ? initialData.data() : {};

  const fetchData = async () => {
    const document = await getAthleteInfo(id);
    setInitialData(document);
  };

  useEffect(() => {
    fetchData();
  }, [showModal]);

  // Configuration for the input elements
  const inputConfig = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'hidden',
      value: 'athlete',
    },
    {
      name: 'photoURL',
      label: 'Photo',
      type: 'file',
    },
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
    },
    {
      name: 'gender',
      type: 'select',
      label: 'Gender',
      options: ['', 'Male', 'Female'],
      required: true,
    },
    {
      name: 'birthdate',
      label: 'Birthdate',
      type: 'date',
    },
    {
      name: 'school',
      label: 'School',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'number',
    },
  ];

  // Component to trigger the modal form
  const TriggerModalButton = ({ openModal, label }) => {
    return <button onClick={openModal}>{label}</button>;
  };

  const EnhancedModalForm = withModalForm(
    TriggerModalButton,
    inputConfig,
    myCollection
  );

  return (
    <>
      <div className="outline-dashed outline-2 outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2">
        <div className=" font-bold">Active</div>
        <div>{athleteInfo.active ? '✅' : '❌'}</div>
        <div className=" font-bold">Gender</div>
        <div>{athleteInfo.gender}</div>
        <div className=" font-bold">Birthdate</div>
        <div>{athleteInfo.birthdate}</div>
        <div className=" font-bold">School</div>
        <div>{athleteInfo.school}</div>
        <div className=" font-bold">Phone</div>
        <div>{athleteInfo.phone}</div>
        <div className=" font-bold">Father</div>
        <div>{athleteInfo.father}</div>
        <div className=" font-bold">Mother</div>
        <div>{athleteInfo.mother}</div>
      </div>

      <div className="flex justify-end">
        <Button>
          <EnhancedModalForm
            showModal={showModal}
            setShowModal={setShowModal}
            label="Edit"
            title="Edit Athlete Details"
            cancelLabel="Cancel"
            saveLabel="Save"
            initialData={initialData}
          />
        </Button>
      </div>
    </>
  );
}

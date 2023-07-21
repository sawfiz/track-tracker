// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Contexts
import { AthleteContext } from '../contexts/AthleteContext';

// Modals
import EditAthleteModal from '../modals/EditAthleteModal';

// Styling
import Button from 'react-bootstrap/esm/Button';

export default function AthletePersonalDetails({ id }) {
  const {
    editAthlete,
    getAthleteInfo,
    showEditModal,
    updateAthlete,
    closeEditModal,
  } = useContext(AthleteContext);

  const [athleteInfo, setAthleteInfo] = useState({});
  const [hasNoName, setHasNoName] = useState(false);
  const [hasNoGender, setHasNoGendar] = useState(false);

  const fetchData = async () => {
    const data = await getAthleteInfo(id);
    setAthleteInfo(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [showEditModal]);

  const handleClick = () => {
    editAthlete(id);
  };

  // Function to handle changes in the form
  const handleChange = (e) => {
    if (e.target.name === 'name' && e.target.value) {
      setHasNoName(false);
    }
    if (e.target.name === 'gender' && e.target.value) {
      setHasNoGendar(false);
    }

    setAthleteInfo({ ...athleteInfo, [e.target.name]: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setAthleteInfo({ ...athleteInfo, [e.target.name]: e.target.checked });
  };

  // Function to handle adding a photo in the form
  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `athlete_photos/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    // Update the photoURL field in the form data
    setAthleteInfo({ ...athleteInfo, photoURL: downloadURL });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (athleteInfo.name) {
      setHasNoName(false);
      if (athleteInfo.gender) {
        setHasNoGendar(false);
        updateAthlete(athleteInfo);
        closeEditModal();
      } else {
        setHasNoGendar(true);
      }
      setHasNoName(true);
    }
  };

  return (
    <>
      <div className='outline-dashed outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2'>
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
        <Button onClick={handleClick}>Edit</Button>
      </div>

      <EditAthleteModal
        show={showEditModal}
        athleteInfo={athleteInfo}
        handleChange={handleChange}
        handleChangeCheckbox={handleChangeCheckbox}
        handleChangePhoto={handleChangePhoto}
        handleSubmit={handleSubmit}
        hasNoName={hasNoName}
        hasNoGender={hasNoGender}
      />
    </>
  );
}

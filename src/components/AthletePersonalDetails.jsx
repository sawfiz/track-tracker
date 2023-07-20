// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Contexts
import { AthleteContext } from '../contexts/AthleteContext';

// Modals
import EditAthleteModal from '../modals/EditAthleteModal';

// Styling
import styled from 'styled-components';
import Button from 'react-bootstrap/esm/Button';

const S = {
  InfoGrid: styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px dashed hotpink;
  `,
  Attr: styled.div`
    font-weight: bold;
  `,
  Data: styled.div``,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: right;
    margin-right: 1rem;
  `,
};

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
      <S.InfoGrid>
        <S.Attr>Active</S.Attr>
        <S.Data>{athleteInfo.active ? '✅' : '❌'}</S.Data>
        <S.Attr>Gender</S.Attr>
        <S.Data>{athleteInfo.gender}</S.Data>
        <S.Attr>Birthdate</S.Attr>
        <S.Data>{athleteInfo.birthdate}</S.Data>
        <S.Attr>School</S.Attr>
        <S.Data>{athleteInfo.school}</S.Data>
        <S.Attr>Phone</S.Attr>
        <S.Data>{athleteInfo.phone}</S.Data>
        <S.Attr>Father</S.Attr>
        <S.Data>{athleteInfo.father}</S.Data>
        <S.Attr>Mother</S.Attr>
        <S.Data>{athleteInfo.mother}</S.Data>
      </S.InfoGrid>
      <S.ButtonContainer>
        <Button onClick={handleClick}>Edit</Button>
      </S.ButtonContainer>
      {showEditModal && (
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
      )}
    </>
  );
}

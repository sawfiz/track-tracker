import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import Button from 'react-bootstrap/esm/Button';
import EditAthleteModal from '../modals/EditAthleteModal';

const S = {};
S.InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  margin: 1rem 0;
`;

S.Attr = styled.div`
  font-weight: bold;
`;

S.Data = styled.div``;

export default function AthletePersonalDetails({id}) {

  const {
    athleteToEdit,
    editAthlete,
    getAthleteInfo,
    updateAthlete,
    showEditModal,
    closeEditModal,
  } = useContext(AthleteDetailsContext);

  const [athleteInfo, setAthleteInfo] = useState({});

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
  return (
    <>      <S.InfoGrid>
    <S.Attr>Active</S.Attr>
    <S.Data>{athleteInfo.active?'✅':'❌'}</S.Data>
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
  <Button onClick={handleClick}>Edit</Button>
  {showEditModal && <EditAthleteModal show={showEditModal} />}
  </>
  )
}

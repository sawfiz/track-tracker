import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import AthletePersonalDetails from './AthletePersonalDetails';
import AthleteAttendance from './AthleteAttendance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const S = {};

S.H3 = styled.h3`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: var(--color-dark);
`;

S.ImgContainer = styled.div`
  position: absolute;
  top: 105px;
  right: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export default function AthleteDetails() {
  const { id } = useParams();
  const { getAthleteInfo, showEditModal } = useContext(AthleteDetailsContext);

  const [athleteInfo, setAthleteInfo] = useState({});

  const [expandPersonalDetails, setExpandPersonalDetails] = useState(false);
  const [expandAttendances, setExpandAttendances] = useState(false);
  const [expandNotes, setExpandNotes] = useState(false);
  const [expandPayments, setExpandPayments] = useState(false);

  const handlePersonalToggle = () => {
    setExpandPersonalDetails(!expandPersonalDetails);
  };
  const handleAttendanceToggle = () => {
    setExpandAttendances(!expandAttendances);
  };
  const handleNotesToggle = () => {
    setExpandNotes(!expandNotes);
  };
  const handlePaymentsToggle = () => {
    setExpandPayments(!expandPayments)
  };

  const fetchData = async () => {
    const data = await getAthleteInfo(id);
    setAthleteInfo(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // This is needed so that when athlete name is changed
  // A rerender is forced
  useEffect(() => {
    fetchData();
  }, [showEditModal]);

  return (
    <main>
      <p>
        <a href="/athletes">Manage Athletes</a>
      </p>
      <h2>{athleteInfo.name}</h2>
      <S.ImgContainer>
        <img
          style={{ maxwidth: '150px', maxHeight: '150px' }}
          src={athleteInfo.photoURL}
          alt="photo"
        />
      </S.ImgContainer>
      <S.H3 onClick={handlePersonalToggle}>
        {expandPersonalDetails ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Personal Details
      </S.H3>
      {expandPersonalDetails && <AthletePersonalDetails id={id} />}

      <S.H3 onClick={handleAttendanceToggle}>
        {expandAttendances ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Attendance
      </S.H3>
      {expandAttendances && <AthleteAttendance athleteID={id} />}

      <S.H3 onClick={handleNotesToggle}>
        {expandNotes ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Notes
      </S.H3>

      <S.H3 onClick={handlePaymentsToggle}>
        {expandPayments ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Payments
      </S.H3>
    </main>
  );
}

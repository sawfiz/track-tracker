import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import AthletePersonalDetails from './AthletePersonalDetails';
import AthleteAttendance from './AthleteAttendance';
import AthleteNotes from './AthleteNotes';
import AthletePayments from './AthletePayments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const S = {
  H3: styled.h3`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: var(--color-dark);
  `,
  ImgContainer: styled.div`
    position: absolute;
    top: 105px;
    right: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  `,
};

export default function AthleteDetails() {
  const { id } = useParams();
  const { getAthleteInfo, showEditModal } = useContext(AthleteDetailsContext);
  const { userInfo } = useContext(UserContext);

  const [athleteInfo, setAthleteInfo] = useState({});

  const [expandPersonalDetails, setExpandPersonalDetails] = useState(false);
  const [expandAttendances, setExpandAttendances] = useState(false);
  const [expandNotes, setExpandNotes] = useState(false);
  const [expandPayments, setExpandPayments] = useState(false);

  const handlePersonalToggle = () => {
    setExpandPersonalDetails(!expandPersonalDetails);
    setExpandAttendances(false);
    setExpandNotes(false);
    setExpandPayments(false);
  };
  const handleAttendanceToggle = () => {
    setExpandPersonalDetails(false);
    setExpandAttendances(!expandAttendances);
    setExpandNotes(false);
    setExpandPayments(false);
  };
  const handleNotesToggle = () => {
    setExpandPersonalDetails(false);
    setExpandAttendances(false);
    setExpandNotes(!expandNotes);
    setExpandPayments(false);
  };
  const handlePaymentsToggle = () => {
    setExpandPersonalDetails(false);
    setExpandAttendances(false);
    setExpandNotes(false);
    setExpandPayments(!expandPayments);
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
      {userInfo.role === 'admin' && (
        <p>
          <a href="/athletes">Manage Athletes</a>
        </p>
      )}
      {userInfo.role === 'parent' && (
        <p>
          <a href="/children">My children</a>
        </p>
      )}
      <p></p>
      <h2>{athleteInfo.name}</h2>
      <S.ImgContainer>
        <img
          style={{ maxWidth: '150px', maxHeight: '150px' }}
          src={athleteInfo.photoURL}
          alt="profile"
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
      {expandNotes && <AthleteNotes athleteID={id} />}

      <S.H3 onClick={handlePaymentsToggle}>
        {expandPayments ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Payments
      </S.H3>
      {expandPayments && <AthletePayments athleteID={id} />}
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

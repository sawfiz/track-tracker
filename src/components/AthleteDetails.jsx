// Libraries
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { AthleteContext } from '../contexts/AthleteContext';

// Components
import AthletePersonalDetails from './AthletePersonalDetails';
import AthleteAttendance from './AthleteAttendance';
import AthleteNotes from './AthleteNotes';
import AthletePayments from './AthletePayments';

// Styling
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import 'typeface-roboto';

const S = {
  H3: styled.h3`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #444;
  `,
  ImageContainer: styled.div`
    position: absolute;
    top: 105px;
    right: 5px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(255, 255, 0, 0.5);
  `,
  CroppedImage: styled.img`
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  `,
};

export default function AthleteDetails() {
  const { id } = useParams();
  const { getAthleteInfo, showEditModal } = useContext(AthleteContext);
  const { userInfo } = useContext(UserContext);

  const [athleteInfo, setAthleteInfo] = useState({});

  const [expand, setExpand] = useState({
    personalDetails: false,
    attendances: false,
    notes: false,
    payments: false,
  });

  const handleToggle = (section) => {
    setExpand((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
          <Link to="/athletes">Manage Athletes</Link>
        </p>
      )}
      {userInfo.role === 'parent' && (
        <p>
          <Link to="/children">My children</Link>
        </p>
      )}
      <p></p>
      <h2>{athleteInfo.name}</h2>
      <S.ImageContainer>
        {athleteInfo.photoURL ? (
          <S.CroppedImage src={athleteInfo.photoURL} alt="profile" />
        ) : (
          <S.CroppedImage
            src={
              athleteInfo.gender === 'Male'
                ? '/images/boy.png'
                : '/images/girl.png'
            }
            alt="profile"
          />
        )}
      </S.ImageContainer>
      <S.H3 onClick={() => handleToggle('personalDetails')}>
        {expand.personalDetails ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Personal Details
      </S.H3>
      {expand.personalDetails && <AthletePersonalDetails id={id} />}

      <S.H3 onClick={() => handleToggle('attendances')}>
        {expand.attendances ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Attendance
      </S.H3>
      {expand.attendances && <AthleteAttendance athleteID={id} />}

      <S.H3 onClick={() => handleToggle('notes')}>
        {expand.notes ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Notes
      </S.H3>
      {expand.notes && <AthleteNotes athleteID={id} />}

      <S.H3 onClick={() => handleToggle('payments')}>
        {expand.payments ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Payments
      </S.H3>
      {expand.payments && <AthletePayments athleteID={id} />}
      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

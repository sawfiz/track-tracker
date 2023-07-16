import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import { AthleteContext } from '../contexts/AthleteContext';
import AthletePersonalDetails from './AthletePersonalDetails';
import AthleteAttendance from './AthleteAttendance';
import AthleteNotes from './AthleteNotes';
import AthletePayments from './AthletePayments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import boyImg from '../images/boy.png';
import girlImg from '../images/girl.png';

const S = {
  H3: styled.h3`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: var(--color-dark);
  `,
  ImgContainer: styled.div``,
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
            <S.CroppedImage
              src={athleteInfo.photoURL}
              alt="boyImg"
            />
          ) : (
            <S.CroppedImage
              src={(athleteInfo.gender==='Male') ? boyImg : girlImg}
              alt="boyImg"
            />
          )}
      </S.ImageContainer>
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

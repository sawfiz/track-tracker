import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import AthletePersonalDetails from './AthletePersonalDetails';

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
  console.log("🚀 ~ file: AthleteDetails.js:32 ~ AthleteDetails ~ athleteInfo:", athleteInfo)

  const [sectionExpanded, setSectionExpanded] = useState(false);

  const handleSectionToggle = () => {
    setSectionExpanded(!sectionExpanded);
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
          style={{ width: '150px' }}
          src={athleteInfo.photoURL}
          alt="photo"
        />
      </S.ImgContainer>
      <S.H3 onClick={handleSectionToggle}>
        {sectionExpanded ? (
          <FontAwesomeIcon icon={faChevronDown} className="fa-thin" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="fa-thin" />
        )}{' '}
        Personal Details
      </S.H3>

      {sectionExpanded && <AthletePersonalDetails id={id} />}

      <h3>Notes</h3>
      <h3>Attandance</h3>
      <h3>Payments</h3>
    </main>
  );
}

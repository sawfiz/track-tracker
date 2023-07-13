import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';
import Button from 'react-bootstrap/esm/Button';
import EditAthleteModal from '../modals/EditAthleteModal';
import AthletePersonalDetails from './AthletePersonalDetails';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

export default function AthleteDetails() {
  const { id } = useParams();
  const {
    athleteToEdit,
    editAthlete,
    getAthleteInfo,
    updateAthlete,
    showEditModal,
    closeEditModal,
  } = useContext(AthleteDetailsContext);

  const [athleteInfo, setAthleteInfo] = useState({});

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

  const handleClick = () => {
    editAthlete(id);
  };

  return (
    <main>
      <p>
        <a href="/athletes">Manage Athletes</a>
      </p>
      <h2>{athleteInfo.name}</h2>

      <h3 onClick={handleSectionToggle}>
        {sectionExpanded ? '⊖' : '⊕'} Personal Details
      </h3>
      {sectionExpanded && <AthletePersonalDetails id={id} />}

      <h3>Notes</h3>
      <h3>Attandance</h3>
      <h3>Payments</h3>
    </main>
  );
}

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
import Chevron from './Chevron';

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

  const imgSrc = athleteInfo.photoURL
    ? athleteInfo.photoURL
    : athleteInfo.gender === 'Male'
    ? '/images/boy.png'
    : '/images/girl.png';

  return (
    <main>
      {['admin', 'coach'].includes(userInfo.role) && (
        <p>
          <Link to="/athletes">Manage Athletes</Link>
        </p>
      )}

      <h2 className='mt-4'>{athleteInfo.name}</h2>

      <div className=" absolute top-[3.5rem] right-[0.5rem] w-28 h-28 overflow-hidden">
        <img
          className="w-full h-full object-center object-cover rounded-lg "
          src={imgSrc}
          alt="profile"
        />
      </div>

      <h3 onClick={() => handleToggle('personalDetails')}>
        <Chevron expand={expand.personalDetails} />
        Personal Details
      </h3>
      {expand.personalDetails && <AthletePersonalDetails id={id} />}

      <h3 onClick={() => handleToggle('attendances')}>
        <Chevron expand={expand.attendances} />
        Attendance
      </h3>
      {expand.attendances && <AthleteAttendance athleteID={id} />}

      <h3 onClick={() => handleToggle('notes')}>
      <Chevron expand={expand.notes} />
        Notes
      </h3>
      {expand.notes && <AthleteNotes athleteID={id} />}

      <h3 onClick={() => handleToggle('payments')}>
      <Chevron expand={expand.payments} />
        Payments
      </h3>
      {expand.payments && <AthletePayments athleteID={id} />}

      {/* A div at the end of page to make sure Foot shows properly */}
      <div style={{ height: '2rem' }}></div>
    </main>
  );
}

// Libraries
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { AthleteContext } from '../contexts/AthleteContext';

export default function Athlete({ athleteID, small }) {
  const { getAthleteInfo } = useContext(AthleteContext);
  const [data, setData] = useState({});

  const fetchAthleteName = async () => {
    const info = await getAthleteInfo(athleteID);
    setData(info);
  };

  useEffect(() => {
    fetchAthleteName();
  }, []);

  const imgSrc = data.photoURL
    ? data.photoURL
    : data.gender === 'Male'
    ? '/images/boy.png'
    : '/images/girl.png';

  const image = (
    <img
      className="w-full h-full object-cover object-center rounded-md"
      src={imgSrc}
      alt="profile"
    />
  );

  return (
    <Link to={`/athletes/${athleteID}`} className="no-underline text-slate-700">
      {small ? (
        <div className="h-10 outline-dashed outline-pink-300 flex justify-between items-center p-1">
          {data.name}
          <div className="w-8 h-8">{image}</div>
        </div>
      ) : (
        <div className="h-48 outline-dashed outline-pink-300 flex flex-col justify-around items-center">
          <div className="w-32 h-32"> {image}</div>
          {data.name}
        </div>
      )}
    </Link>
  );
}

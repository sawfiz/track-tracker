import React, { useContext, useEffect, useState } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';

export default function AthleteName({ athlete }) {
  console.log("🚀 ~ file: Athlete.js:5 ~ Athlete ~ athlete:", athlete)
  const { getAthleteName } = useContext(AthleteContext);
  const [athleteName, setAthleteName] = useState('');

  useEffect(() => {
    const fetchAthleteName = async () => {
      const name = await getAthleteName(athlete);
      setAthleteName(name);
    };
    fetchAthleteName();
  }, []);

  return <div>{athleteName}</div>;
}

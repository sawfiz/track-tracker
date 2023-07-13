import React, { useContext, useEffect, useState } from 'react';
import { AthleteContext } from '../contexts/AthleteContext';

export default function AthleteName({ athlete }) {
  const { getAthleteName } = useContext(AthleteContext);
  const [athleteName, setAthleteName] = useState('');

  useEffect(() => {
    const fetchAthleteName = async () => {
      const name = await getAthleteName(athlete);
      setAthleteName(name);
    };
    fetchAthleteName();
  }, []);

  return <p>{athleteName}</p>;
}

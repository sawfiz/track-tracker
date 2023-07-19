import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AthleteContext } from '../contexts/AthleteContext';

export default function AthleteName({ id }) {
  const { getAthleteName } = useContext(AthleteContext);
  const [athleteName, setAthleteName] = useState('');

  useEffect(() => {
    const fetchAthleteName = async () => {
      const name = await getAthleteName(id);
      setAthleteName(name);
    };
    fetchAthleteName();
  }, []);

  return (
    <div style={{ marginLeft: '1rem' }}>
      <Link to={`/athletes/${id}`}>{athleteName}</Link>
    </div>
  );
}

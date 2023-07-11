import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Attendee({ athlete }) {
  const { getName } = useContext(UserContext);

  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getName(athlete);
      setName(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {name}
    </div>
  );
}

// Libraries
import React, { useState, useEffect, useContext } from 'react';

// Contexts
import { ParentsContext } from '../../../contexts/ParentsContext';

// Components
import Parent from './Parent';

export default function ManageParents() {
  const { getParents } = useContext(ParentsContext);
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const data = await getParents();
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h2>Manage Parents</h2>
      <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4">
        {list.map((user) => (
          <Parent key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}

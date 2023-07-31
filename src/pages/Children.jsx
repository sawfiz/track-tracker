// Libraries
import React, { useContext, useEffect, useState } from 'react';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { ParentsContext } from '../contexts/ParentsContext';

// Components
import Athlete from '../components/Athlete';

export default function Children() {
  const { userId } = useContext(UserContext);
  const { getChildren } = useContext(ParentsContext);
  const [children, setChildren] = useState([]);

  const fetchData = async () => {
    const data = await getChildren(userId);
    const filteredData = data.filter((d) => d !== '');
    setChildren(filteredData);
  };
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Render the Athlete components
  const childrenComponents = children.map((id) => (
    <Athlete key={id} athleteID={id} small={false} />
  ));

  return (
    <main>
      <h2>My Children</h2>
      <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4">
        {childrenComponents}
      </div>
    </main>
  );
}

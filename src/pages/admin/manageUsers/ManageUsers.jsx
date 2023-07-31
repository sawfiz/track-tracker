// Libraries
import React, { useState, useEffect, useContext } from 'react';

// Contexts
import { UserContext } from '../../../contexts/UserContext';

// Components
import UnmanagedUser from './UnmanagedUser';

export default function ManageUsers() {
  const { getUsersWithNoRoles } = useContext(UserContext);
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const data = await getUsersWithNoRoles();
    setList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h3>Unmanaged users</h3>
      <div className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-4">
        {list.map((user) => (
          <UnmanagedUser key={user.id} user={user} />
        ))}
      </div>
    </main>
  );
}

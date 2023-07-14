import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getAdditionalUserInfo } from 'firebase/auth';

export default function ManageUsers() {
  const {getUsersWithNoRoles} = useContext(UserContext)
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const data = await getUsersWithNoRoles();
    setList(data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h2>Manage Users</h2>
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h3>Unmanaged users</h3>
      {list.map((user)=><p key={user.id}>{user.data().name}</p>)}
    </main>
  );
}

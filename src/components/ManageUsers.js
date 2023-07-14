import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import UnmanagedUser from './UnmanagedUser';
import styled from 'styled-components';

const S = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 1rem 0;
  `,
};

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
      <p>
        <a href="/admin">Admin Tools</a>
      </p>
      <h3>Unmanaged users</h3>
      <S.Grid>
        {list.map((user) => (
          <UnmanagedUser key={user.id} user={user} />
        ))}
      </S.Grid>
    </main>
  );
}

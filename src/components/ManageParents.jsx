// Libraries
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// Contexts
import { ParentsContext } from '../contexts/ParentsContext';

// Components
import Parent from './Parent';

// Styling
import styled from 'styled-components';

const S = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 1rem 0;
  `,
};

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
      <p>
        <Link to="/admin">Admin Tools</Link>
      </p>
      <h2>Manage Parents</h2>
      <S.Grid>
        {list.map((user) => (
          <Parent key={user.id} user={user} />
        ))}
      </S.Grid>
    </main>
  );
}

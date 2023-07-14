import React, { useState, useEffect, useContext } from 'react';
import { ParentsContext } from '../contexts/ParentsContext';
import styled from 'styled-components';
import Parent from './Parent';

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
    console.log("🚀 ~ file: ManageParents.js:21 ~ fetchData ~ data:", data)
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
      <h2>Manage Parents</h2>
      <S.Grid>
        {list.map((user) => (
          <Parent key={user.id} user={user} />
        ))}
      </S.Grid>
    </main>
  );
}
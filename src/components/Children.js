import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';
import { ParentsContext } from '../contexts/ParentsContext';
import Athlete from './Athlete';

const S = {
  Grid: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 1rem 0;
  `,
  Section: styled.div`
    margin: 1rem 0;
  `,
};

export default function Children() {
  const { userId } = useContext(UserContext);
  const { getChildren } = useContext(ParentsContext);
  const [children, setChildren] = useState([]);

  const fetchData = async () => {
    const data = await getChildren(userId);
    const set = new Set(data);
    const sortedData = Array.from(set).sort();
    setChildren(sortedData);
  };
  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Render the Athlete components
  const childrenComponents = children.map((doc) => (
    <Athlete key={doc.id} athleteID={doc.id} />
  ));

  return (
    <main>
      <h2>My Children</h2>
      <S.Grid>{childrenComponents}</S.Grid>
    </main>
  );
}

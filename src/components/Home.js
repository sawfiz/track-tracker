import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';

export const Home = () => {
  const { loggedIn, userInfo } = useContext(UserContext);
  console.log('🚀 ~ file: Home.js:12 ~ Home ~ userInfo:', userInfo);

  const S = {};
  S.HomePage = styled.div`
    height: calc(100vh - 1rem);
    background: var(--color-light);
    height: 100vh;
  `;

  S.Section = styled.div`
    margin: 1rem;
  `;

  S.H2 = styled.h2``;

  return (
    <S.HomePage>
      {loggedIn && <p>Hello, {userInfo.name}</p>}
      {userInfo.role === 'admin' && (
        <p>
          <a href="/admin">Admin Tools</a>
        </p>
      )}
      <S.Section>
        <S.H2>News</S.H2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, unde
          et, neque porro mollitia repellat deleniti quasi ullam eius, quae amet
          distinctio officia tempore aut eos ipsum. Facilis, sint minima.
        </p>
      </S.Section>
      <S.Section>
        <S.H2>About Us</S.H2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
          voluptatem aliquid corporis eos earum magni at fugiat optio molestiae
          aspernatur doloremque, nobis quaerat voluptate laboriosam consectetur
          ratione assumenda ipsam nihil!
        </p>
      </S.Section>
    </S.HomePage>
  );
};

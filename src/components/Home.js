import React, { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../contexts/UserContext';

const S = {};

export const Home = () => {
  const { loggedIn, userInfo } = useContext(UserContext);

  return (
    <main>
      {loggedIn && <p>Hello, {userInfo.name}</p>}
      {loggedIn && userInfo.role === 'admin' && (
        <p>
          <a href="/admin">Admin Tools</a>
        </p>
      )}
      <div>
        <h2>News</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, unde
          et, neque porro mollitia repellat deleniti quasi ullam eius, quae amet
          distinctio officia tempore aut eos ipsum. Facilis, sint minima.
        </p>
      </div>
      <div>
        <h2>About Us</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore,
          voluptatem aliquid corporis eos earum magni at fugiat optio molestiae
          aspernatur doloremque, nobis quaerat voluptate laboriosam consectetur
          ratione assumenda ipsam nihil!
        </p>
      </div>
    </main>
  );
};

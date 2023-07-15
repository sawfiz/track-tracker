import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const Home = () => {
  const { isLoggedIn, userInfo } = useContext(UserContext);

  return (
    <main>
      {isLoggedIn && <p>Hello, {userInfo.name}</p>}
      {isLoggedIn && userInfo.role === 'admin' && (
        <p>
          <Link to="/admin">Admin Tools</Link>
        </p>
      )}
      {isLoggedIn && userInfo.role === 'parent' && (
        <p>
          <Link to="/children">My children</Link>
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

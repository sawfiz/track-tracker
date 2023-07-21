// Libraries
import React, { useContext } from 'react';

// Components
import News from './News';


export default function Home() {
  // const { isLoggedIn, userInfo } = useContext(UserContext);

  return (
    <main>
      <News />
    </main>
  );
}

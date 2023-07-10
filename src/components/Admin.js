import React from 'react';
import styled from 'styled-components';

import ManageUsers from './ManageUsers';
import TrackAttendees from './TrackAttendees';

export default function Admin() {
  const S = {};

  return (
    <div>
      <h2>Admin Tools</h2>
      <p>
        <a href="/track">Track training</a>
      </p>
      <p>
        <a href="/users">Manage users</a>
      </p>
      <p>
        <a href="/parents">Manage parents</a>
      </p>
      <p>
        <a href="/athletes">Manage athletes</a>
      </p>
    </div>
  );
}

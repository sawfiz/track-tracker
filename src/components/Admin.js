import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';

import ManageUsers from './ManageUsers';
import AddAttendence from './AddAttendence';

const S = {};

export default function Admin() {

  return (
    <main>
      <h2>Admin Tools</h2>
      <p>
        <a href="/add-attendence">Add Attendence</a>
      </p>
      <p>
        <a href="/attendence">Show Attendence</a>
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
      </main>
  );
}

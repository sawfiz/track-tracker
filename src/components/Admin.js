import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components';

import ManageUsers from './ManageUsers';
import AddAttendence from './AddAttendance';

const S = {};

export default function Admin() {
  return (
    <main>
      <h2>Admin Tools</h2>
      <p>
        <a href="/add-attendance">Add Attendance</a>
      </p>
      <p>
        <a href="/attendance">Show Attendence</a>
      </p>
      <p>
        <a href="/athletes">Manage athletes</a>
      </p>
        <hr></hr>
      <p>
        <a href="/users">Manage users</a>
      </p>
      <p>
        <a href="/parents">Manage parents</a>
      </p>
    </main>
  );
}

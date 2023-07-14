import React from 'react';
import Download from './Download';

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
      <p>
        <a href="/parents">Manage parents</a>
      </p>
      <p>
        <a href="/manage-users">Unmanage users</a>
      </p>
      <p>
        <a href="/download">Download to Excel</a>
      </p>
      <Download />
    </main>
  );
}

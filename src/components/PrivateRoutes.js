import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import Admin from './Admin';
import AddAttendance from './AddAttendance';
import ShowAttendance from './ShowAttendance';
import ManageAthletes from './ManageAthletes';
import AthleteDetails from './AthleteDetails';
import ManageUsers from './ManageUsers';
import ManageParents from './ManageParents';
import Children from './Children';

export const PrivateRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-attendance" element={<AddAttendance />} />
        <Route path="/attendance" element={<ShowAttendance />} />
        <Route path="/athletes" element={<ManageAthletes />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/parents" element={<ManageParents />} />
        <Route path="/children" element={<Children />} />
        <Route path="/athletes/:id" element={<AthleteDetails />} />
      </Routes>
    </>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserContextProvider from './contexts/UserContext';
import AttendenceContextProvider from './contexts/AttendanceContext';
import AthleteContextProvider from './contexts/AthleteContext';
import ParentsContextProvider from './contexts/ParentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ParentsContextProvider>
        <AthleteContextProvider>
          <AttendenceContextProvider>
              <App />
          </AttendenceContextProvider>
        </AthleteContextProvider>
      </ParentsContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

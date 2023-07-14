import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import UserContextProvider from './contexts/UserContext';
import AttendenceContextProvider from './contexts/AttendanceContext';
import AthleteContextProvider from './contexts/AthleteContext';
import AthleteDetailsContextProvider from './contexts/AthleteDetailsContext';
import ParentsContextProvider from './contexts/ParentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ParentsContextProvider>
          <AthleteContextProvider>
            <AthleteDetailsContextProvider>
              <AttendenceContextProvider>
                <App />
              </AttendenceContextProvider>
            </AthleteDetailsContextProvider>
          </AthleteContextProvider>
        </ParentsContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

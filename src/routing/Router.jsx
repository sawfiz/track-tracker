// Library
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// Routing
import RootLayout from './RootLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Page components
import Home from '../components/Home';
import AboutUs from '../components/AboutUs';
import NewsDetails from '../components/NewsDetails';
import Admin from '../components/Admin';
import AddAttendance from '../components/AddAttendance';
import ShowAttendance from '../components/ShowAttendance';
import ManageAthletes from '../components/ManageAthletes';
import AthleteDetails from '../components/AthleteDetails';
import ManageUsers from '../components/ManageUsers';
import ManageParents from '../components/ManageParents';
import Children from '../components/Children';
import EditAboutUs from '../components/EditAboutUs';
import EditNews from '../components/EditNews';

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<AboutUs />} />
    <Route path="/news/:id" element={<NewsDetails />} />

    <Route element={<ProtectedRoute roles={['admin', 'coach']} />}>
      <Route path="/admin" element={<Admin />} />
      <Route path="/add-attendance" element={<AddAttendance />} />
      <Route path="/attendance" element={<ShowAttendance />} />
      <Route path="/athletes" element={<ManageAthletes />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/parents" element={<ManageParents />} />
      <Route path="/edit-about" element={<EditAboutUs />} />
      <Route path="/edit-news" element={<EditNews />} />
    </Route>

    <Route element={<ProtectedRoute roles={['admin', 'coach', 'parent']} />}>
      <Route path="/athletes/:id" element={<AthleteDetails />} />
    </Route>

    <Route element={<ProtectedRoute roles={['parent']} />}>
      <Route path="/children" element={<Children />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

export default router;

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
import Home from '../pages/home/Home'
import AboutUs from '../pages/AboutUs';
import NewsDetails from '../components/news/NewsDetails';
import Admin from '../pages/admin/Admin';
import AddAttendance from '../pages/admin/addAttendance/AddAttendance';
import ShowAttendance from '../pages/admin/ShowAttendance';
import ManageAthletes from '../pages/admin/manageAthletes/ManageAthletes';
import AthleteDetails from '../pages/admin/manageAthletes/AthleteDetails';
import ManageUsers from '../pages/admin/manageUsers/ManageUsers';
import ManageParents from '../pages/admin/manageParents/ManageParents';
import Children from '../pages/Children';
import ManageNews from '../pages/admin/ManageNews'

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
      <Route path="/manage-news" element={<ManageNews />} />
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

import {useContext} from 'react'
import { Navigate, Route} from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { loggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      element={loggedIn ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
/***** Pages ****/
import FullLayout from '../layouts/FullLayout';
import Login from '../views/ui/Login';
import Applications from '../views/ui/Applications'
import Packages from "../views/ui/packages";
import Dashboard from '../views/dashboard';
import DemoCreds from '../views/ui/DemoCreds';


const isAuthenticated = localStorage.hasOwnProperty('access-token') && localStorage.getItem('access-token') !== "";
console.log(isAuthenticated)
const PrivateRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated ? <Navigate to="/home" /> : children;
};

/*****Routes******/
const ThemeRoutes = [
  { path: '/', element: <PublicRoute><Login /></PublicRoute> },
  { path: "/home", element: <PrivateRoute><FullLayout isHome={true}><Applications /></FullLayout></PrivateRoute> },
  { path: "/dashboard/:id", element: <PrivateRoute><FullLayout><Dashboard /></FullLayout></PrivateRoute> },
  // { path: "/config", element: <PrivateRoute><Applications /></PrivateRoute> },
  { path: "/packages", element: <PrivateRoute><FullLayout isHome={true}><Packages /></FullLayout></PrivateRoute> },
  { path: '/demo/cred', element: <PrivateRoute><FullLayout isHome={true}><DemoCreds /></FullLayout></PrivateRoute> }
];

export default ThemeRoutes;

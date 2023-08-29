import React from 'react';
import { Navigate } from 'react-router-dom';
/***** Pages ****/
import FullLayout from '../layouts/FullLayout';
import Login from '../views/ui/Login';
import Applications from '../views/ui/Applications'
import CreateUser from '../components/dashboard/Users/CreateUser';
import Packages from "../views/ui/packages";
import Dashboard from '../views/dashboard';
import UpdateUser from '../components/dashboard/Users/UpdateUser';
import CreateApplication from '../views/ui/CreateApplication';
import AppUserList from '../components/dashboard/Users/AppUserList';


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
  { path: "/users", element: <PrivateRoute><AppUserList /></PrivateRoute> },
  // { path: "/config", element: <PrivateRoute><Applications /></PrivateRoute> },
  { path: "/create_user/:id", element: <PrivateRoute><FullLayout isHome={true}><CreateUser /></FullLayout></PrivateRoute> },
  { path: "/update_user/:id", element: <PrivateRoute><FullLayout isHome={true}><UpdateUser /></FullLayout></PrivateRoute> },
  { path: "/packages", element: <PrivateRoute><FullLayout isHome={true}><Packages /></FullLayout></PrivateRoute> },
  { path: '/save_application', element: <PrivateRoute><FullLayout isHome={true}><CreateApplication /></FullLayout></PrivateRoute> }
];

export default ThemeRoutes;
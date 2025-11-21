

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root.jsx';
import HomePage from '../components/pages/HomePage.jsx';
import BrowseCars from '../components/pages/BrowseCars.jsx';
import AddCar from '../components/pages/AddCar.jsx';
import MyListings from '../components/pages/MyListings.jsx';
import MyBookings from '../components/pages/MyBookings.jsx';
import CarDetails from '../components/pages/CarDetails.jsx';
import NotFound from '../components/pages/NotFound.jsx';
import PrivateRoute from '../firebase/PrivateRoute.jsx';
import Login from '../components/pages/Login.jsx';
import Register from '../components/pages/Register.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <NotFound />,
    children: [
      // Public pages
      { index: true, Component: HomePage },
      { path: 'browse-cars', Component: BrowseCars },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },

      // Private pages
      { path: 'add-car', Component: () => <PrivateRoute><AddCar /></PrivateRoute> },
      { path: 'my-listings', Component: () => <PrivateRoute><MyListings /></PrivateRoute> },
      { path: 'my-bookings', Component: () => <PrivateRoute><MyBookings /></PrivateRoute> },
      { path: 'cars/:id', Component: () => <PrivateRoute><CarDetails /></PrivateRoute> },

      // 404 fallback
      { path: '*', Component: NotFound },
    ],
  },
]);





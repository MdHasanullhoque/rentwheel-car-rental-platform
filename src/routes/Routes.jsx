
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../Root/Root.jsx';
import HomePage from '../components/pages/HomePage.jsx';
import BrowseCars from '../components/pages/BrowseCars.jsx';
import AddCar from '../components/pages/AddCar.jsx';
import MyListings from '../components/pages/MyListings.jsx';
import MyBookings from '../components/pages/MyBookings.jsx';
import CarDetails from '../components/pages/CarDetails.jsx';
import UpdateCar from '../components/pages/UpdateCar.jsx';
import NotFound from '../components/pages/NotFound.jsx';
import PrivateRoute from '../firebase/PrivateRoute.jsx';
import Login from '../components/pages/Login.jsx';
import Register from '../components/pages/Register.jsx';

const BASE_URL = 'https://rentwheels-api-server-seven.vercel.app';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <NotFound />,
    children: [
      // Home page
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          const res = await fetch(`${BASE_URL}/Featured-Cars`);
          if (!res.ok) throw new Error('Failed to fetch Featured Cars');
          return res.json();
        },
      },

      // Car details
      {
        path: '/Featured-Cars/:id',
        element: <CarDetails />,
        loader: async ({ params }) => {
          const res = await fetch(`${BASE_URL}/Featured-Cars/${params.id}`);
          if (!res.ok) throw new Error('Failed to fetch Car Details');
          return res.json();
        },
      },

      // Browse cars
      { path: '/browse-cars', element: <BrowseCars /> },

      // Authentication
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },

      // Private routes
      {
        path: '/add-car',
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-listings',
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-car/:id',
        element: (
          <PrivateRoute>
            <UpdateCar />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`${BASE_URL}/Featured-Cars/${params.id}`);
          if (!res.ok) throw new Error('Failed to fetch Car for Update');
          return res.json();
        },
      },
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      // 404 fallback
      { path: '*', element: <NotFound /> },
    ],
  },
]);



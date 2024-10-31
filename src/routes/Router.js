import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from '../pages/mainpage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import Page404 from './pages/Page404';
import NewSplit from './pages/NewSplit';
import DashboardAppPage from './pages/DashboardAppPage';
import AddMoney from './pages/AddMoney';
import TransferMoney from './pages/TransferMoney';
import AddFriend from './pages/AddFriend';

export default function Router({ state }) {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'friends', element: <UserPage /> },
        { path: 'newSplit', element: <NewSplit state={state} /> },
        { path: 'addmoney', element: <AddMoney /> },
        { path: 'transfermoney', element: <TransferMoney /> },
        { path: 'addfriend', element: <AddFriend /> },

        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

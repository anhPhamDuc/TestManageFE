/* eslint-disable no-unused-vars */
import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - change account
const ChangeAccount = Loadable(lazy(() => import('pages/changeAccount/index')));

// render - change account
const RegisterTopic = Loadable(lazy(() => import('pages/topics/index')));

// render - documentation
const Documentation = Loadable(lazy(() => import('pages/documentation/index')));

// render - login demo
// const LoginPageDemo = Loadable(lazy(() => import('pages/authentication/LoginForm/index')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Account = Loadable(lazy(() => import('pages/components-overview/AccountDemo')));

const Faculty = Loadable(lazy(() => import('pages/faculty')));
const FacultyCreate = Loadable(lazy(() => import('pages/faculty/create')));
const FacultyEdit = Loadable(lazy(() => import('pages/faculty/edit')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: '/faculty',
      element: (
        <ProtectedRoute>
          <Faculty />
        </ProtectedRoute>
      )
    },
    {
      path: '/facultyCreate',
      element: (
        <ProtectedRoute>
          <FacultyCreate />
        </ProtectedRoute>
      )
    },
    {
      path: '/facultyEdit',
      element: (
        <ProtectedRoute>
          <FacultyEdit />
        </ProtectedRoute>
      )
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <ProtectedRoute>
              <DashboardDefault />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: 'change-account',
      element: (
        <ProtectedRoute>
          <ChangeAccount />
        </ProtectedRoute>
      )
    },
    {
      path: 'documentation',
      element: <Documentation />
    },
    {
      path: 'register-topic',
      element: (
        <ProtectedRoute>
          <RegisterTopic />
        </ProtectedRoute>
      )
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'icons/Account',
      element: <Account />
    }
  ]
};
export default MainRoutes;
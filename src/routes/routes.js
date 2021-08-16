import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Can from '../components/Can'
import companyRoutes from './company'
import employeeRoutes from './employee'
import Forbidden from '../pages/Forbidden'

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))
const Settings = lazy(() => import('../pages/Settings'))
const Construction = lazy(() => import('../pages/Construction'))
const Constructions = lazy(() => import('../pages/Constructions'))
const Users = lazy(() => import('../pages/Users'))
const Calendar = lazy(() => import('../pages/Calendar'))
const Assistance = lazy(() => import('../pages/Assistance'))
const Visit = lazy(() => import('../pages/Visit'))
const AssistanceType = lazy(() => import('../pages/Assistance/AssistanceType'))

const routes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    component: ({ authenticated }) =>
      authenticated ? <Redirect to="/home" /> : <Redirect to="/login" />
  },
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    key: 'HOME',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Home />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  ...companyRoutes,
  ...employeeRoutes,
  {
    path: '/obras',
    key: 'CONSTRUCTION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Constructions />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/obras/:idConstruction',
    key: 'CONSTRUCTIONS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Construction />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/settings',
    key: 'SETTINGS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Settings />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/users',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Users />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/calendar',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Calendar />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/visits',
    key: 'ASSISTANCE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Assistance />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/visit/:idVisit`,
    key: 'VISIT-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <Visit />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/visit/:idVisit/assistance-type`,
    key: 'ASSISTANCE-TYPE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SIMPLE_USER']}
        yes={() => (
          <Layout>
            <AssistanceType />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]
export default routes

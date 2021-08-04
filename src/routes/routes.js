import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Can from '../components/Can'
import companyRoutes from './company'
import employeeRoutes from './employee'

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))
const Settings = lazy(() => import('../pages/Settings'))
const Construction = lazy(() => import('../pages/Construction'))
const Constructions = lazy(() => import('../pages/Constructions'))
const Users = lazy(() => import('../pages/Users'))

const routes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    component: ({ authenticated }) =>
      authenticated ? <Redirect to="/home" /> : <Redirect to="/companies" />
  },
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => <Login />}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: '/home',
    key: 'HOME',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Home />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  ...companyRoutes,
  ...employeeRoutes,
  {
    path: '/obras',
    key: 'CONSTRUCTION',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Constructions />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: '/obras/:idConstruction',
    key: 'CONSTRUCTIONS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Construction />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: '/settings',
    key: 'SETTINGS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Settings />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: '/users',
    key: 'USERS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Users />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  }
]
export default routes

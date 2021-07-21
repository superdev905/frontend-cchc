import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Can from '../components/Can'
import companyRoutes from './company'

const Home = lazy(() => import('../pages/Home'))
const Settings = lazy(() => import('../pages/Settings'))
const Construction = lazy(() => import('../pages/Construction'))
const Constructions = lazy(() => import('../pages/Constructions'))

const routes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    component: ({ authenticated }) =>
      authenticated ? <Redirect to="/home" /> : <Redirect to="/companies" />
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
  }
]
export default routes

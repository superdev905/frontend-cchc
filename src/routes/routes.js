import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Can from '../components/Can'

const Company = lazy(() => import('../pages/Company'))
const Companies = lazy(() => import('../pages/Companies'))
const Home = lazy(() => import('../pages/Home'))

const routes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    component: ({ authenticated }) =>
      authenticated ? <Redirect to="/home" /> : <Redirect to="/empresas" />
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
  {
    path: '/empresas',
    key: 'COMPANIES',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Companies />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: '/empresas/:idCompany',
    key: 'COMPANY',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Company />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  }
]
export default routes

import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

const Login = lazy(() => import('../pages/Login'))
const Unemployed = lazy(() => import('../pages/Unemployed'))
const UnemployedDetails = lazy(() =>
  import('../pages/Unemployed/UnemployedDetails')
)
const UnemployedHistory = lazy(() =>
  import('../pages/Unemployed/UnemployedHistory')
)

const rootPath = 'unemployed'

const unemployedRoutes = [
  {
    path: `/${rootPath}`,
    key: 'UNEMPLOYED',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Unemployed />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:idUnemployed/details`,
    key: 'UNEMPLOYED',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <UnemployedDetails />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:idUnemployed/details/Benefits-history`,
    key: 'UNEMPLOYED',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <UnemployedHistory />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default unemployedRoutes

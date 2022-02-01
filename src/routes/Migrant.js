import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

const Login = lazy(() => import('../pages/Login'))
const Migrant = lazy(() => import('../pages/Migrant'))

const rootPath = 'migrants'

const migrantRoutes = [
  {
    path: `/${rootPath}`,
    key: 'MIGRANTS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Migrant />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default migrantRoutes

import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

const Login = lazy(() => import('../pages/Login'))
const SocialCase = lazy(() => import('../pages/SocialCase'))

const rootPath = 'social-case'

const socialCaseRoutes = [
  {
    path: `/${rootPath}`,
    key: 'SOCIALCASE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <SocialCase />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default socialCaseRoutes

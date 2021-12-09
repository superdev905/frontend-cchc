import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

const Login = lazy(() => import('../pages/Login'))
const SocialCase = lazy(() => import('../pages/SocialCase'))
const SocialCaseDetails = lazy(() => import('../pages/SocialCase/Details'))

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
  },
  {
    path: `/${rootPath}/:socialCaseId/details`,
    key: 'SOCIALCASE-TAB-DETAILS',
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <SocialCaseDetails />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:socialCaseId/analysis`,
    key: 'SOCIALCASE-TAB-DETAILS',
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <SocialCaseDetails />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:socialCaseId/plan`,
    key: 'SOCIALCASE-TAB-DETAILS',
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <SocialCaseDetails />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:socialCaseId/records`,
    key: 'SOCIALCASE-TAB-DETAILS',
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <SocialCaseDetails />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:socialCaseId/close`,
    key: 'SOCIALCASE-TAB-DETAILS',
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <SocialCaseDetails />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default socialCaseRoutes

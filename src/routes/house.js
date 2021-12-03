import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

const Housing = lazy(() => import('../pages/Housing'))
const HousingNew = lazy(() => import('../pages/Housing'))
const HousingWorker = lazy(() => import('../pages/Housing'))

const houseRoutes = [
  {
    path: '/housing',
    key: 'housing',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Housing />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/housing-new',
    key: 'HOUSING-NEW',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <HousingNew />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/housingworker',
    key: 'HOUSING-worker',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <HousingWorker />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default houseRoutes

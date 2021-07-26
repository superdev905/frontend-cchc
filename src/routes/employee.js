import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'

const Employees = lazy(() => import('../pages/Employees'))
const AddEmployee = lazy(() => import('../pages/Employees/AddEmployee'))

const rootName = 'employee'

const companyRoutes = [
  {
    path: `/${rootName}s`,
    key: 'COMPANIES',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employees />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: `/${rootName}/new`,
    key: 'COMPANIES-NEW',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <AddEmployee />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  }
]

export default companyRoutes

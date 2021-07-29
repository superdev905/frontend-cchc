import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'

const Employees = lazy(() => import('../pages/Employees'))
const Employee = lazy(() => import('../pages/Employee'))

const rootName = 'employee'

const companyRoutes = [
  {
    path: `/${rootName}s`,
    key: 'EMPLOYEES',
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
    path: `/${rootName}/:idEmployee`,
    key: 'EMPLOYEE-DETAILS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  }
]

export default companyRoutes

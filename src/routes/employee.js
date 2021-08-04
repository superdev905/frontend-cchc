import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import {
  EmployeeInfoContact,
  EmployeeDetails,
  PensionSituation,
  SpecializationHistory,
  EmployeeJobs,
  EmployeeFamiliarGroup,
  HousingSituation
} from '../components/Employee'

const Login = lazy(() => import('../pages/Login'))
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
        no={() => <Login />}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/info`,
    key: 'EMPLOYEE-INFO',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeDetails />
            </Employee>
          </Layout>
        )}
        no={() => <Login />}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/contacts`,
    key: 'EMPLOYEE-CONTACT',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeInfoContact />
            </Employee>
          </Layout>
        )}
        no={() => <Login />}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/family`,
    key: 'EMPLOYEE-FAMILY',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeFamiliarGroup />
            </Employee>
          </Layout>
        )}
        no={() => <Login />}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/situation`,
    key: 'EMPLOYEE-SITUATION',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <PensionSituation />
              <HousingSituation />
            </Employee>
          </Layout>
        )}
        no={() => <Login />}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/specialties`,
    key: 'EMPLOYEE-SPECIALTIES',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <SpecializationHistory />
            </Employee>
          </Layout>
        )}
        no={() => <Login />}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/jobs-history`,
    key: 'EMPLOYEE-JOBS-HISTORY',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeJobs />
            </Employee>
          </Layout>
        )}
        no={() => <Login />}
      />
    )
  }
]

export default companyRoutes

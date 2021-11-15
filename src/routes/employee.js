import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import {
  EmployeeInfoContact,
  EmployeeDetails,
  SpecializationHistory,
  EmployeeJobs,
  EmployeeFamiliarGroup,
  Situation,
  EmployeeVisits,
  EmployeeAttachments
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
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employees />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/info`,
    key: 'EMPLOYEE-INFO',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeDetails />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/contacts`,
    key: 'EMPLOYEE-CONTACT',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeInfoContact />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/family`,
    key: 'EMPLOYEE-FAMILY',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeFamiliarGroup />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/situation`,
    key: 'EMPLOYEE-SITUATION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <Situation />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/specialties`,
    key: 'EMPLOYEE-SPECIALTIES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <SpecializationHistory />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/jobs-history`,
    key: 'EMPLOYEE-JOBS-HISTORY',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeJobs />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/attentions`,
    key: 'EMPLOYEE-ATTENTIONS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeVisits />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootName}/:idEmployee/attachments`,
    key: 'EMPLOYEE-ATTACHMENTS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Employee>
              <EmployeeAttachments />
            </Employee>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default companyRoutes

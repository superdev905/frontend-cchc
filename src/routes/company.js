import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import CompanyDetails from '../components/Company/Details'
import CompanyDivisions from '../components/Company/Divisions'
import CompanyContacts from '../components/Company/Contacts'
import CompanyConstructions from '../components/Company/Constructions'
import AttendedEmployees from '../components/Company/AttendedEmployees'

const Companies = lazy(() => import('../pages/Companies'))
const Company = lazy(() => import('../pages/Company'))

const rootName = 'company'

const companyRoutes = [
  {
    path: `/companies`,
    key: 'COMPANIES',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Companies />
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/details`,
    key: 'COMPANY-DETAILS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyDetails />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/divisions`,
    key: 'COMPANY-DIVISIONS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyDivisions />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/contacts`,
    key: 'COMPANY-CONTACTS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyContacts />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/constructions`,
    key: 'COMPANY-CONTACTS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyConstructions />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/employees`,
    key: 'COMPANY-ATTENDED-EMPLOYEES',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Company>
              <AttendedEmployees />
            </Company>
          </Layout>
        )}
        no={() => <Forbidden />}
      />
    )
  }
]

export default companyRoutes

import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import CompanyDetails from '../components/Company/Details'
import CompanyDivisions from '../components/Company/Divisions'
import CompanyContacts from '../components/Company/Contacts'
import CompanyConstructions from '../components/Company/Constructions'

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
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Companies />
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/details`,
    key: 'COMPANY-DETAILS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyDetails />
            </Company>
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/divisions`,
    key: 'COMPANY-DIVISIONS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyDivisions />
            </Company>
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/contacts`,
    key: 'COMPANY-CONTACTS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyContacts />
            </Company>
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  },
  {
    path: `/${rootName}/:idCompany/constructions`,
    key: 'COMPANY-CONTACTS',
    exact: true,
    component: () => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Company>
              <CompanyConstructions />
            </Company>
          </Layout>
        )}
        no={() => <span>Log in</span>}
      />
    )
  }
]

export default companyRoutes
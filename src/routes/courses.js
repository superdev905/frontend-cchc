import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'
import { PaymentsTab, EmployeesTab, ClassesTab } from '../components/Course'

const Login = lazy(() => import('../pages/Login'))
const Courses = lazy(() => import('../pages/Courses'))
const Course = lazy(() => import('../pages/Course'))

const rootPath = 'courses'

const courseRoutes = [
  {
    path: `/${rootPath}`,
    key: 'COURSES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'OTEC',
          'JEFATURA'
        ]}
        yes={() => (
          <Layout>
            <Courses />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:idCourse/classes`,
    key: 'COURSE-PAGE-CLASSES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'OTEC',
          'JEFATURA'
        ]}
        yes={() => (
          <Layout>
            <Course>
              <ClassesTab />
            </Course>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:idCourse/payments`,
    key: 'COURSE-PAGE-PAYMENTS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'OTEC',
          'JEFATURA'
        ]}
        yes={() => (
          <Layout>
            <Course>
              <PaymentsTab />
            </Course>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/${rootPath}/:idCourse/enroll`,
    key: 'COURSE-PAGE-EMPLOYEES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'OTEC',
          'JEFATURA'
        ]}
        yes={() => (
          <Layout>
            <Course>
              <EmployeesTab />
            </Course>
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default courseRoutes

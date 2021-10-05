import { lazy } from 'react'
import Layout from '../components/Layout'
import Can from '../components/Can'
import Forbidden from '../pages/Forbidden'

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
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
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
    path: `/${rootPath}/:idCourse`,
    key: 'COURSE-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Course />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  }
]

export default courseRoutes

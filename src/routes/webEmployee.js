import { lazy } from 'react'
import WebConsult from '../components/Layout/WebConsult'

const QuestionLogin = lazy(() => import('../pages/QuestionLogin'))
const QuestionEmployee = lazy(() => import('../pages/QuestionEmployee'))
const publicRoutes = [
  {
    path: '/login-web',
    key: 'housing',
    exact: true,
    component: () => <QuestionLogin />
  },

  {
    path: '/consultas-web',
    key: 'housing',
    exact: true,
    component: () => <QuestionEmployee />
  }
]

export default publicRoutes

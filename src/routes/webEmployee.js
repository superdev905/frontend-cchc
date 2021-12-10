import { lazy } from 'react'

const QuestionLogin = lazy(() => import('../pages/QuestionLogin'))

const publicRoutes = [
  {
    path: '/consultas-web',
    key: 'housing',
    exact: true,
    component: () => <QuestionLogin />
  }
]

export default publicRoutes

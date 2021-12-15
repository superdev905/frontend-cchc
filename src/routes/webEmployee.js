import { lazy } from 'react'
import WebConsult from '../components/Layout/WebConsult'

const QuestionLogin = lazy(() => import('../pages/QuestionLogin'))
const WebConsultEmployee = lazy(() => import('../pages/WebConsultEmployee'))

const publicRoutes = [
  {
    path: '/consultas-web',
    key: 'housing',
    exact: true,
    component: () => <QuestionLogin />
  },
  {
    path: '/consultas-web/employee',
    key: 'housing',
    exact: true,
    component: () => (
      <WebConsult>
        <WebConsultEmployee />
      </WebConsult>
    )
  },
  {
    path: '/consultas-web/preguntas',
    key: 'housing',
    exact: true,
    component: () => (
      <WebConsult>
        <WebConsultEmployee />
      </WebConsult>
    )
  },
  {
    path: '/consultas-web/historial',
    key: 'housing',
    exact: true,
    component: () => (
      <WebConsult>
        <WebConsultEmployee />
      </WebConsult>
    )
  }
]

export default publicRoutes

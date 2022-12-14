import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Can from '../components/Can'
import companyRoutes from './company'
import employeeRoutes from './employee'
import Forbidden from '../pages/Forbidden'
import coursesRoutes from './courses'
import SocialCaseRoutes from './SocialCase'
import MigrantRoutes from './Migrant'
// import houseRoutes from './house'
import webQuestionEmployee from './webEmployee'
import UnemployedRoutes from './Unemployed'

const Login = lazy(() => import('../pages/Login'))
const Home = lazy(() => import('../pages/Home'))
const Settings = lazy(() => import('../pages/Settings'))
const Construction = lazy(() => import('../pages/Construction'))
const Constructions = lazy(() => import('../pages/Constructions'))
const Etc = lazy(() => import('../pages/Etc/Etc'))
const Users = lazy(() => import('../pages/Users'))
const Calendar = lazy(() => import('../pages/Calendar'))
const Visits = lazy(() => import('../pages/Visits'))
const VisitsToClose = lazy(() => import('../pages/Visits/VisitsToClose'))
const Visit = lazy(() => import('../pages/Visit'))
const AssistanceType = lazy(() => import('../pages/Visits/AssistanceType'))
const Assistance = lazy(() => import('../pages/Assistance'))
const AttendedEmployee = lazy(() => import('../pages/AttendedEmployee'))
const Polls = lazy(() => import('../pages/Polls/Polls'))
const Poll = lazy(() => import('../pages/Poll/Poll'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const Scholarships = lazy(() => import('../pages/Scholarships/Scholarships'))
const ApprovedScholarship = lazy(() => import('../pages/ApprovedScholarship'))
const Scholarship = lazy(() => import('../pages/Scholarship'))
const Benefits = lazy(() => import('../pages/Benefits'))
const BenefitPage = lazy(() => import('../pages/Benefit'))
const ScheduleList = lazy(() => import('../pages/ScheduleList'))
const ScheduleNew = lazy(() => import('../pages/ScheduleNew'))
const Schedule = lazy(() => import('../pages/Schedule'))
const Housing = lazy(() => import('../pages/Housing'))
const HousingNew = lazy(() => import('../pages/HousingNew'))
const Agreement = lazy(() => import('../pages/Agreement'))
const AgreementEmployee = lazy(() => import('../pages/AgreementEmployee'))
const QuestionPage = lazy(() => import('../pages/WebConsultBoss'))
const Question = lazy(() => import('../pages/Question'))
const QuestionDashboard = lazy(() => import('../pages/QuestionDashboard'))
const InclusionCase = lazy(() => import('../pages/InclusionCase'))
const InclusiveCases = lazy(() => import('../pages/InclusionCases'))
const Protocols = lazy(() => import('../pages/Protocols'))
const Reports = lazy(() => import('../pages/Reports'))

const routes = [
  {
    path: '/',
    key: 'INDEX',
    exact: true,
    component: ({ authenticated }) =>
      authenticated ? <Redirect to="/home" /> : <Redirect to="/login" />
  },
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: Login
  },
  {
    path: '/home',
    key: 'HOME',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'OTEC',
          'JEFATURA',
          'ANALISTA_CASOS',
          'SOCIAL_CASES',
          'CESANTES',
          'ETC'
        ]}
        yes={() => (
          <Layout>
            <Home />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/obras',
    key: 'CONSTRUCTION',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Constructions />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/obras/:idConstruction',
    key: 'CONSTRUCTIONS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <Construction />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/settings',
    key: 'SETTINGS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Settings />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/users',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Users />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/calendar',
    key: 'USERS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Calendar />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/visits',
    key: 'ASSISTANCE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Visits />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/visits-close',
    key: 'VISITS-TO-CLOSE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <VisitsToClose />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/visit/:idVisit`,
    key: 'VISIT-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Visit />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/visit/:idVisit/assistance-type`,
    key: 'ASSISTANCE-TYPE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <AssistanceType />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/visit/:idVisit/assistance/:idAssistance`,
    key: 'ASSISTANCE-TYPE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Assistance />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/visit/:idVisit/attended/:idEmployee`,
    key: 'ASSISTANCE-TYPE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <AttendedEmployee />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/polls',
    key: 'POLLS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Polls />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/polls/:idPoll`,
    key: 'POLL',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN']}
        yes={() => (
          <Layout>
            <Poll />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/perfil',
    key: 'PROFILE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'OTEC',
          'JEFATURA',
          'ANALISTA_CASOS',
          'SOCIAL_CASES',
          'CESANTES'
        ]}
        yes={() => (
          <Layout>
            <Profile />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scholarships',
    key: 'SCHOLARSHIP',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'PROJECTS', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Scholarships />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/scholarship/approved/:idApproved',
    key: 'APPROVED-SCHOLARSHIP',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'PROJECTS', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <ApprovedScholarship />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/postulations/:idPostulation`,
    key: 'POSTULATION-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'PROJECTS', 'SOCIAL_ASSISTANCE']}
        yes={() => (
          <Layout>
            <Scholarship />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/benefits',
    key: 'BENEFITS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PROJECTS']}
        yes={() => (
          <Layout>
            <Benefits />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/benefits/:benefitId',
    key: 'BENEFITS-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'PROJECTS']}
        yes={() => (
          <Layout>
            <BenefitPage />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/schedule',
    key: 'SCHEDULE-LIST',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <ScheduleList />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/schedule/new',
    key: 'SCHEDULE-CREATE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <ScheduleNew />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/schedule/:scheduleId',
    key: 'SCHEDULE-DETAILS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <Schedule />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/housing',
    key: 'HOUSING',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <Housing />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/housing/new',
    key: 'HOUSING-NEW',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <HousingNew />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/agreement/:agreementId',
    key: 'AGREEMENT-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <Agreement />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/agreement/:agreementId/employee/:employeeId',
    key: 'AGREEMENT-EMPLOYEE-PAGE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <AgreementEmployee />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/question/list',
    key: 'WEB-CONSULT',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE', 'JEFATURA', 'SOCIAL_CASES']}
        yes={() => (
          <Layout>
            <QuestionPage />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/question/list/:questionNumber`,
    key: 'Question',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE', 'JEFATURA', 'SOCIAL_CASES']}
        yes={() => (
          <Layout>
            <Question />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: `/question/dashboard`,
    key: 'Question',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'SOCIAL_ASSISTANCE', 'JEFATURA', 'SOCIAL_CASES']}
        yes={() => (
          <Layout>
            <QuestionDashboard />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/inclusive',
    key: 'INCLUSIVE',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'SOCIAL_CASES']}
        yes={() => (
          <Layout>
            <InclusivePage />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/inclusion-cases',
    key: 'INCLUSION-CASES',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <InclusiveCases />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/inclusion-cases/:caseNumber',
    key: 'INCLUSION-CASES-DETAILS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA', 'ANALISTA_CASOS']}
        yes={() => (
          <Layout>
            <InclusionCase />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/protocols',
    key: 'PROTOCOLS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={[
          'ADMIN',
          'PROJECTS',
          'SOCIAL_ASSISTANCE',
          'JEFATURA',
          'ANALISTA_CASOS',
          'SOCIAL_CASES',
          'CESANTES'
        ]}
        yes={() => (
          <Layout>
            <Protocols />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/reports',
    key: 'REPORTS',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'JEFATURA']}
        yes={() => (
          <Layout>
            <Reports />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  {
    path: '/etc',
    key: 'ETC',
    exact: true,
    component: ({ authenticated }) => (
      <Can
        availableTo={['ADMIN', 'ETC']}
        yes={() => (
          <Layout>
            <Etc />
          </Layout>
        )}
        no={() => (authenticated ? <Forbidden /> : <Login />)}
      />
    )
  },
  ...companyRoutes,
  ...employeeRoutes,
  ...coursesRoutes,
  ...webQuestionEmployee,
  ...SocialCaseRoutes,
  ...UnemployedRoutes,
  ...MigrantRoutes
]
export default routes

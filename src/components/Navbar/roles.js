import {
  DashboardOutlined as DashboardIcon,
  Business as ConstructionIcon,
  Settings as SettingsIcon,
  BusinessCenter as BusinessIcon,
  People as UserIcon,
  AssignmentInd as EmployeeIcon,
  Assignment as AssistanceIcon,
  School as SchoolIcon,
  BorderColor as BorderColorIcon,
  Book as BookIcon,
  Favorite as BenefitIcon,
  WatchLater as ScheduleIcon,
  Home as HousingIcon,
  Accessible as AccessibleIcon
} from '@material-ui/icons'
import LanguageIcon from '@material-ui/icons/Language'

const modulesByRole = {
  COMMON: [{ title: 'Home', path: '/home', icon: <DashboardIcon /> }],
  ADMIN: [
    { title: 'Empresas', path: '/companies', icon: <BusinessIcon /> },
    { title: 'Obras', path: '/obras', icon: <ConstructionIcon /> },
    {
      title: 'Trabajadores',
      path: '/employees',
      icon: <EmployeeIcon />
    },
    {
      title: 'Visitas',
      path: '/visits',
      icon: <AssistanceIcon />
    },
    {
      title: 'Becas',
      path: '/scholarships',
      icon: <SchoolIcon />
    },
    {
      title: 'Cursos',
      path: '/courses',
      icon: <BookIcon />
    },
    {
      title: 'Beneficios',
      path: '/benefits',
      icon: <BenefitIcon />
    },
    {
      title: 'Programación',
      path: '/schedule',
      icon: <ScheduleIcon />
    },
    {
      title: 'Vivienda',
      path: '/housing',
      icon: <HousingIcon />
    },
    {
      title: 'Caso Social',
      path: '/social-case',
      icon: <BookIcon />
    },
    {
      title: 'Inclusión',
      path: '/inclusion-cases',
      icon: <AccessibleIcon />
    },
    { title: 'Encuestas', path: '/polls', icon: <BorderColorIcon /> },
    {
      title: 'Consultas Web',
      path: '/question/dashboard',
      icon: <LanguageIcon />
    },
    {
      index: 5,
      title: 'Usuarios',
      path: '/users',
      icon: <UserIcon />
    },

    {
      title: 'Configuración',
      path: '/settings',
      icon: <SettingsIcon />
    }
  ],
  SOCIAL_ASSISTANCE: [
    { title: 'Empresas', path: '/companies', icon: <BusinessIcon /> },
    { title: 'Obras', path: '/obras', icon: <ConstructionIcon /> },
    {
      title: 'Trabajadores',
      path: '/employees',
      icon: <EmployeeIcon />
    },
    {
      title: 'Visitas',
      path: '/visits',
      icon: <AssistanceIcon />
    },
    {
      title: 'Becas',
      path: '/scholarships',
      icon: <SchoolIcon />
    },
    {
      title: 'Cursos',
      path: '/courses',
      icon: <BookIcon />
    },
    {
      title: 'Beneficios',
      path: '/benefits',
      icon: <BenefitIcon />
    },
    {
      title: 'Programación',
      path: '/schedule',
      icon: <ScheduleIcon />
    },
    {
      title: 'Caso Social',
      path: '/social-case',
      icon: <BookIcon />
    },
    {
      title: 'Inclusión',
      path: '/inclusion-cases',
      icon: <AccessibleIcon />
    },
    {
      title: 'Consultas Web',
      path: '/question/dashboard',
      icon: <LanguageIcon />
    },
    {
      title: 'Vivienda',
      path: '/housing',
      icon: <HousingIcon />
    }
  ],
  PROJECTS: [
    {
      title: 'Becas',
      path: '/scholarships',
      icon: <SchoolIcon />
    }
  ],
  OTEC: [
    {
      title: 'Cursos',
      path: '/courses',
      icon: <BookIcon />
    }
  ]
}

export default modulesByRole

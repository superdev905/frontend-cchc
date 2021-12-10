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
  Home as HousingIcon
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
    { title: 'Encuestas', path: '/polls', icon: <BorderColorIcon /> },
    {
      index: 5,
      title: 'Usuarios',
      path: '/users',
      icon: <UserIcon />
    },
    {
      title: 'Consultas Web',
      path: '/webconsult',
      icon: <LanguageIcon />
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

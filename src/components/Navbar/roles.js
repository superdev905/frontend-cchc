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
  Book as BookIcon
} from '@material-ui/icons'

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
    { title: 'Encuestas', path: '/polls', icon: <BorderColorIcon /> },
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
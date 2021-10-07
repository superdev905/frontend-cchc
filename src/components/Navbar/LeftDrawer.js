import { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'
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
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.common.white,
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  },
  activeItem: {
    color: theme.palette.primary.main,
    '& svg': {
      fill: theme.palette.primary.main
    }
  },
  listIcon: {
    minWidth: 38
  }
}))

const commonRoutes = [
  { title: 'Home', path: '/home', icon: <DashboardIcon /> },
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
]

const LeftDrawer = ({ ...props }) => {
  const classes = useStyles()
  const [userRoutes, setUserRoutes] = useState([...commonRoutes])
  const { location } = useSelector((state) => state.router)
  const { user } = useSelector((state) => state.auth)

  const onItemClick = (path) => {
    props.history.push(path)
  }

  const getRoutes = (roleKey) => {
    if (roleKey === 'ADMIN') {
      return userRoutes.concat([
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
      ])
    }

    if (roleKey === 'PROJECTS')
      return [
        { title: 'Home', path: '/home', icon: <DashboardIcon /> },
        {
          title: 'Becas',
          path: '/scholarships',
          icon: <SchoolIcon />
        }
      ]
    return commonRoutes
  }

  useEffect(() => {
    if (user) {
      setUserRoutes(getRoutes(user.role.key))
    }
  }, [user])

  return (
    <div>
      <Box className={classes.toolbar}>
        <Typography variant="h6">Fundación CCHC</Typography>
      </Box>
      <Divider />
      <List>
        {userRoutes.map((route, index) => (
          <ListItem
            button
            key={route.title}
            onClick={() => onItemClick(route.path)}
            key={`drawer-items--${index}`}
            className={clsx(
              location.pathname.includes(route.path) && classes.activeItem
            )}
          >
            <ListItemIcon className={classes.listIcon}>
              {route.icon}
            </ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default withRouter(LeftDrawer)

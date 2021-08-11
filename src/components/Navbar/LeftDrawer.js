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
  Assignment as AssistanceIcon
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
    title: 'Asistencia',
    path: '/assistance',
    icon: <AssistanceIcon />
  },
  {
    title: 'Configuración',
    path: '/settings',
    icon: <SettingsIcon />
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

  useEffect(() => {
    if (user) {
      if (user.is_administrator) {
        const adminRoutes = userRoutes.concat([
          {
            index: 5,
            title: 'Usuarios',
            path: '/users',
            icon: <UserIcon />
          }
        ])
        setUserRoutes(adminRoutes)
      }
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

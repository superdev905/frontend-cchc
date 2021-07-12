import { useState } from 'react'
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
  Business as BusinessIcon
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
  { title: 'Empresas', path: '/empresas', icon: <BusinessIcon /> }
]

const LeftDrawer = ({ ...props }) => {
  const classes = useStyles()
  const { location } = useSelector((state) => state.router)
  const [routes] = useState([...commonRoutes])

  const onItemClick = (path) => {
    props.history.push(path)
  }

  return (
    <div>
      <Box className={classes.toolbar}>
        <Typography variant="h6">Fundación CCHC</Typography>
      </Box>
      <Divider />
      <List>
        {routes.map((route, index) => (
          <ListItem
            button
            key={route.title}
            onClick={() => onItemClick(route.path)}
            key={`drawer-items--${index}`}
            className={clsx(
              location.pathname === route.path && classes.activeItem
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

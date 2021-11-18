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
import clsx from 'clsx'
import rolesByModules from './roles'

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

const LeftDrawer = ({ ...props }) => {
  const classes = useStyles()
  const [userRoutes, setUserRoutes] = useState([])
  const { location } = useSelector((state) => state.router)
  const { user } = useSelector((state) => state.auth)

  const onItemClick = (path) => {
    props.history.push(path)
  }

  const getRoutes = (roleKey) => {
    const items = rolesByModules[roleKey]

    return rolesByModules.COMMON.concat(items)
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

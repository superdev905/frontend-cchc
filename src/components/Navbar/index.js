import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AlertIcon from '@material-ui/icons/Announcement'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTheme } from '@material-ui/core/styles'
import authActions from '../../state/actions/auth'
import useStyles from './styles'
import useMenu from '../../hooks/useMenu'
import LeftDrawer from './LeftDrawer'
import pollActions from '../../state/actions/poll'
import Announcements from '../Widgets/Announcements'

const ResponsiveDrawer = ({ ...props }) => {
  const { window } = props
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { open, anchorEl, handleClose, handleOpen } = useMenu()
  const {
    open: openAlert,
    anchorEl: anchorElAlert,
    handleClose: handleCloseAlert,
    handleOpen: handleOpenAlert
  } = useMenu()
  const { module } = useSelector((state) => state.ui)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const onCalendarClick = () => {
    history.push('/calendar')
  }

  const onProfileClick = () => {
    history.push('/perfil')
  }

  const logoutUser = () => {
    dispatch(authActions.logout())
  }

  const container =
    window !== undefined ? () => window().document.body : undefined

  useEffect(() => {
    dispatch(pollActions.getModulePolls({ module }))
  }, [module])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="transparent"
        classes={{ root: classes.rootAppBar }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            alignItems="center"
          >
            <IconButton onClick={handleOpenAlert}>
              <AlertIcon color="primary" />
            </IconButton>
            {user &&
              (user.profilePicture !== '' ? (
                <Avatar src={user.profilePicture}></Avatar>
              ) : (
                <Avatar> {user.name.charAt(0)}</Avatar>
              ))}
            <IconButton onClick={handleOpen}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Menu
            id="menu-profile"
            open={open}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <MenuItem onClick={onCalendarClick}>Mi Calendario</MenuItem>
            <MenuItem onClick={onProfileClick}>Ver perfil</MenuItem>
            <Divider />
            <MenuItem onClick={logoutUser}>Cerrar sesión</MenuItem>
          </Menu>
          <Announcements
            open={openAlert}
            anchorEl={anchorElAlert}
            handleClose={handleCloseAlert}
          />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="options">
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <LeftDrawer />
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedLeft: classes.paperAnchorDockedLeft
            }}
            variant="permanent"
            open
          >
            <LeftDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func
}

export default ResponsiveDrawer

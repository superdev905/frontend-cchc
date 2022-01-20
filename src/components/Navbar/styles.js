import { makeStyles } from '@material-ui/core'
import { COLORS } from '../../utils/generateColor'

export default makeStyles((theme) => ({
  root: {
    display: 'flex'
  },

  drawer: {
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up('lg')]: {
      width: theme.constants.drawerWidth,
      flexShrink: 0
    }
  },
  paperAnchorDockedLeft: {
    borderRight: 'none'
  },
  rootAppBar: {
    backgroundColor: theme.palette.common.white
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.constants.drawerWidth}px)`,
      marginLeft: theme.constants.drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: theme.constants.drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  menuOptionRoot: {
    paddingTop: theme.spacing(1)
  },
  menuItem: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
    fontSize: 15
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  role: {
    fontSize: 12,
    opacity: 0.6
  },
  avatar: {
    backgroundColor: COLORS[2]
  }
}))

import { Box, makeStyles } from '@material-ui/core'
import Logo from '../../assets/media/logo_cchc.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'transparent'
    }
  },
  logo: {
    maxWidth: '250px'
  },
  title: {
    fontSize: '20px',
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  loginForm: {
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '70%'
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '470px'
    }
  },
  actions: {
    marginTop: '10px',
    textAlign: 'center'
  }
}))

const Form = ({ children }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box p={3} className={classes.loginForm}>
        <Box p={4} textAlign="center">
          <img
            className={classes.logo}
            src={Logo}
            alt="Fundacion CCHC's logo"
          />
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  )
}

export default Form

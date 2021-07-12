import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '520px',
      margin: '0 auto',
      padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`
    }
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontWeight: 'bold',
    opacity: 0.8,
    margin: `10px 0px`
  },
  actions: {
    marginTop: 15,
    '& button': {
      margin: 0
    }
  }
}))

export default useStyles

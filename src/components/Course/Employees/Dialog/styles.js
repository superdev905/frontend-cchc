import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 800
    }
  },
  centeredSpaced: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  userTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
}))

export default useStyles

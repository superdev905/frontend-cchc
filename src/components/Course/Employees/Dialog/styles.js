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
    marginBottom: 10,
    '& p': {
      fontSize: 16,
      fontWeight: 'bold'
    }
  },
  userTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  subHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5
  },
  box: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid red',
    fontSize: '18px',
    fontWeight: 'bold'
  }
}))

export default useStyles

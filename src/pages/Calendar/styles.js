import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer'
  },
  canceled: {
    backgroundColor: theme.palette.error.light
  },
  title: {
    marginBottom: 2,
    fontSize: 15
  },
  status: {
    fontSize: 12,
    textTransform: 'capitalize'
  }
}))

export default useStyles

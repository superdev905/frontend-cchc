import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
}))

export default useStyles

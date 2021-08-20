import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  white: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main}`
  },
  btnGroup: {
    '& button': {
      margin: 0
    }
  }
}))

export default useStyles

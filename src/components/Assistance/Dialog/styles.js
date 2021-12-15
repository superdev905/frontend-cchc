import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  benefitBox: {
    borderRadius: 5,
    border: `1px dashed ${theme.palette.gray.gray600}`
  },
  newCase: {
    borderRadius: 5,
    border: `2px solid ${theme.palette.primary.light}`,
    position: 'relative'
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: theme.palette.error.main
  }
}))

export default useStyles

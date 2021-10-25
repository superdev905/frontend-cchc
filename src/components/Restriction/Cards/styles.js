import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
    borderRadius: 8,
    border: `1px solid ${theme.palette.gray.gray500}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  iconWrapper: ({ iconColor }) => ({
    width: 40,
    fontSize: 22,
    height: 40,
    borderRadius: '50%',
    backgroundColor: iconColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginRight: '10px'
  }),
  typeTag: {
    fontSize: 15,
    color: theme.palette.gray.gray700
  },
  deleteIcon: {
    color: `${theme.palette.error.main} !important`
  },
  actions: {
    '& button': {
      padding: 5,
      color: theme.palette.primary.main
    }
  }
}))

export default useStyles

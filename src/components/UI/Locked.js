import { FiLock as LockedIcon } from 'react-icons/fi'
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    backgroundColor: '#F5F8FA',
    padding: `${theme.spacing(5)}px 0`,
    borderRadius: theme.spacing(1)
  },
  icon: {
    fontSize: 45,
    color: theme.palette.error.main
  },
  title: {
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: 18,
    opacity: 0.7
  },
  message: {
    fontSize: 16,
    opacity: 0.7
  }
}))

const Locked = ({ title, message }) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box>
        <LockedIcon className={classes.icon} />
      </Box>
      <Typography className={classes.title}> {title}</Typography>
      <Typography className={classes.message}> {message}</Typography>
    </Box>
  )
}

export default Locked

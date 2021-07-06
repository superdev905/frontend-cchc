import PropTypes from 'prop-types'
import { Box, makeStyles, Typography } from '@material-ui/core'
import Button from './CustomButton'

const useStyles = makeStyles(() => ({
  root: {
    height: 150,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5F8FA'
  },
  message: {
    fontWeight: 500,
    fontSize: 15,
    opacity: 0.7
  }
}))

const EmptyState = ({ message, event, actionMessage }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      <Typography align="center" className={classes.message}>
        {message}
      </Typography>
      {event && (
        <Button onClick={event} size="small">
          {actionMessage}
        </Button>
      )}
    </Box>
  )
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  event: PropTypes.func,
  actionMessage: PropTypes.string
}

export default EmptyState

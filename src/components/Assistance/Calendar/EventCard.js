import clsx from 'clsx'
import { Box, makeStyles, Typography } from '@material-ui/core'

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

const EventCard = ({ event }) => {
  const classes = useStyles()
  return (
    <Box className={clsx(classes.root)}>
      <Typography className={classes.title}>{event.title}</Typography>
      <Typography className={classes.status}>{event.status}</Typography>
    </Box>
  )
}

export default EventCard

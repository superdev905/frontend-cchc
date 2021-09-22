import { CalendarToday as CalendarIcon } from '@material-ui/icons'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  createdTime: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.gray.gray600,
    marginRight: 5
  }
}))

const TimeStamp = ({ loading, text }) => {
  const classes = useStyles()
  return (
    <Typography className={classes.createdTime}>
      <CalendarIcon className={classes.icon} />
      {!loading && `Creado ${text}`}
    </Typography>
  )
}

export default TimeStamp

import { FiCalendar as CalendarIcon } from 'react-icons/fi'
import { makeStyles, Typography } from '@material-ui/core'
import { formatText } from '../../formatters'

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
      {!loading && formatText.capitalizeString(`Creado ${text}`)}
    </Typography>
  )
}

export default TimeStamp

import { FiEdit2 as EditIcon } from 'react-icons/fi'
import { Box, IconButton, makeStyles, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../../formatters'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.gray.gray100,
    borderRadius: theme.spacing(1),
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: theme.spacing(1),
    color: theme.palette.primary.main
  },
  date: {
    fontSize: 14
  }
}))

const MeetingCard = ({ meeting, onEdit }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      {onEdit && (
        <IconButton onClick={onEdit} className={classes.icon}>
          <EditIcon />
        </IconButton>
      )}
      <Box mb={1}>
        <Typography className={classes.date}>{`${formatDate(
          new Date(meeting.date)
        )}-${formatHours(new Date(meeting.date))}`}</Typography>
      </Box>
      <Box>
        <Typography>{`Estado: ${meeting.status}`}</Typography>
        <Typography>{`Modalidad: ${meeting.modality}`}</Typography>
        <Typography>{`Observación: ${meeting.observation}`}</Typography>
      </Box>
    </Box>
  )
}

export default MeetingCard

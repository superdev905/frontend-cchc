import { Avatar, Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { FiSave } from 'react-icons/fi'
import { formatDate } from '../../formatters'
import generateColor from '../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginTop: theme.spacing(1),
    border: `1px solid ${theme.palette.gray.gray500}`
  },
  chip: {
    marginBottom: 10
  },
  title: {
    fontSize: 14
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: generateColor()
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 14
  }
}))

const StatusCard = ({ status }) => {
  const classes = useStyles()
  return (
    <Box p={1} className={classes.root}>
      <Typography className={classes.title}>Estado de postulación:</Typography>
      <Box>
        <Chip
          className={classes.chip}
          label={
            <Box display="flex" alignItems="center">
              <FiSave fontSize={19} />
              <Typography style={{ marginLeft: 5 }}>{status.name}</Typography>
            </Box>
          }
        />
        <Box display="flex" alignItems="center">
          <Avatar className={classes.avatar}>
            {status.approver.names.charAt(0)}
          </Avatar>
          <Box ml={'8px'}>
            <Typography
              className={classes.username}
            >{`${status.approver.names} ${status.approver.paternalSurname}`}</Typography>
            <Typography className={classes.date}>
              {formatDate(status.date)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StatusCard

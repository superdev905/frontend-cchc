import clsx from 'clsx'
import { Box, Chip, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../../formatters'
import { UserCard } from '../../Users'
import useStyles from './styles'

const Filled = ({ answer }) => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      <Box>
        <Typography className={classes.title}>Respuesta</Typography>
      </Box>
      <Box my={2}>
        <Typography>{answer.answer}</Typography>
      </Box>
      <Box my={1}>
        <Chip
          className={clsx(classes.chip, classes.areaChip)}
          variant="oulined"
          label={`Area: ${answer.areaName}`}
          size="medium"
        />
        <Chip
          className={clsx(classes.chip, classes.topicArea)}
          variant="oulined"
          label={`Tema: ${answer.topicName}`}
          size="medium"
        />
        <Chip
          className={clsx(classes.chip, classes.channelChip)}
          variant="oulined"
          label={`Canal: ${answer.channel}`}
          size="medium"
        />
      </Box>
      <Box>
        <Typography className={classes.title}>Tiempo de respuesta</Typography>
        <Box>
          <Typography>
            {`Fecha y hora: ${formatDate(
              new Date(answer.date)
            )} - ${formatHours(new Date(answer.date))}`}
          </Typography>
        </Box>
        <Box my={1}>
          <Chip
            className={clsx(classes.chip, classes.channelChip)}
            variant="oulined"
            label={`Respuesta en: ${answer.differenceHours} horas`}
            size="medium"
          />
          <Chip
            className={clsx(classes.chip, classes.channelChip)}
            variant="oulined"
            label={`${
              answer.isLate ? 'Restpuesta tarde' : 'Respuesta a tiempo'
            }`}
            size="medium"
          />
        </Box>
      </Box>
      <Box>
        <Typography className={classes.title}>Profesional</Typography>
        <Box my={1}>
          <Box display="flex" alignItems="center">
            <UserCard user={answer.professional} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Filled

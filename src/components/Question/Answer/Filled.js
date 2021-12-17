import clsx from 'clsx'
import { Box, Chip, Typography } from '@material-ui/core'
import { formatDate, formatHours } from '../../../formatters'
import { UserCard } from '../../Users'
import useStyles from './styles'

const Filled = () => {
  const classes = useStyles()
  return (
    <Box p={2} className={classes.root}>
      <Box>
        <Typography className={classes.title}>Respuesta</Typography>
      </Box>
      <Box my={2}>
        <Typography>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here'
        </Typography>
      </Box>
      <Box my={1}>
        <Chip
          className={clsx(classes.chip, classes.areaChip)}
          variant="oulined"
          label={`Area: ${'Salud'}`}
          size="medium"
        />
        <Chip
          className={clsx(classes.chip, classes.topicArea)}
          variant="oulined"
          label={`Tema: ${'Salud'}`}
          size="medium"
        />
        <Chip
          className={clsx(classes.chip, classes.channelChip)}
          variant="oulined"
          label={`Canal: ${'Salud'}`}
          size="medium"
        />
      </Box>
      <Box>
        <Typography className={classes.title}>Tiempo de respuesta</Typography>
        <Box>
          <Typography>
            {`Fecha y hora: ${formatDate(new Date())} - ${formatHours(
              new Date()
            )}`}
          </Typography>
        </Box>
        <Box my={1}>
          <Chip
            className={clsx(classes.chip, classes.channelChip)}
            variant="oulined"
            label={`Respuesta en: ${'24 horas'}`}
            size="medium"
          />
          <Chip
            className={clsx(classes.chip, classes.channelChip)}
            variant="oulined"
            label={`Respuesta tarde: ${'Salud'}`}
            size="medium"
          />
        </Box>
      </Box>
      <Box>
        <Typography className={classes.title}>Profesional</Typography>
        <Box my={1}>
          <Box display="flex" alignItems="center">
            <UserCard
              user={{
                names: 'Jhon ',
                paternalSurname: 'Doe',
                email: 'jhon@doensakd'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Filled

import clsx from 'clsx'
import { Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { formatDate } from '../../../formatters'
import { COLORS } from '../../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.gray.gray400}`
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    marginRight: 4,
    backgroundColor: theme.palette.success.main
  },
  warnDot: {
    backgroundColor: theme.palette.error.main
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 14
  },
  loaderRoot: {
    height: 100,
    borderRadius: 15,
    width: '100%',
    transform: 'none'
  },
  chip: {
    opacity: 0.8
  },
  lastChip: {
    marginLeft: 5,
    backgroundColor: COLORS[4]
  }
}))

const Loader = () => {
  const classes = useStyles()
  return <Skeleton className={classes.loaderRoot}></Skeleton>
}

const AttentionCard = ({ attention, onClick }) => {
  const classes = useStyles()

  return (
    <Box p={1} className={classes.root} onClick={onClick}>
      <Box display={'flex'}>
        <Chip
          className={clsx(classes.chip)}
          color="primary"
          label={`Area: ${attention.areaName}`}
        />
        <Chip
          className={clsx(classes.chip, classes.lastChip)}
          color="primary"
          label={`Gestión: ${attention.managementName}`}
        />
      </Box>
      <Box mt={1}>
        <Typography className={classes.title}>
          {`${attention.employeeName} ${attention.employeeLastname}`}
        </Typography>
        <Typography className={classes.info}>
          {`Rut: ${attention.employeeRut}`}
        </Typography>
        <Typography className={classes.info}>
          {`Lugar de atención: ${attention.attentionPlace}`}
        </Typography>
        <Typography className={classes.info}>
          {`Assitente: ${attention.assistance.names} ${attention.assistance.paternalSurname}`}
        </Typography>
      </Box>
      <Box mt={1} display="flex" justifyContent="space-between">
        <Typography className={classes.info}>
          {formatDate(attention.date)}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box
            className={clsx(
              classes.dot,
              attention.status === 'SEGUIMIENTO' && classes.warnDot
            )}
          ></Box>
          <Typography className={classes.info}>{attention.status}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

AttentionCard.Loader = Loader

export default AttentionCard

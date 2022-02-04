import { Avatar, Box, Chip, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { formatDate, formatHours } from '../../../formatters'
import { COLORS } from '../../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 15,
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer',
    border: `2px solid transparent`,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`
    }
  },
  dot: {
    width: 13,
    height: 13,
    borderRadius: '50%',
    marginRight: 4,
    backgroundColor: theme.palette.primary.main
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  avatar: {
    marginLeft: 5,
    backgroundColor: COLORS[3],
    textTransform: 'uppercase'
  },
  info: {
    fontSize: 14
  },
  loaderRoot: {
    height: 150,
    borderRadius: 15,
    width: '100%',
    transform: 'none'
  }
}))

const Loader = () => {
  const classes = useStyles()
  return <Skeleton className={classes.loaderRoot}></Skeleton>
}

const VisitCard = ({ visit }) => {
  const history = useHistory()
  const classes = useStyles()

  const handleOnClick = () => {
    history.push(`/visit/${visit.id}`)
  }

  return (
    <Box py={1} px={2} className={classes.root} onClick={handleOnClick}>
      <Box
        display="flex"
        mb={1}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box display="flex" alignItems={'center'}>
          <Box className={classes.dot}></Box>
          <Typography>
            {`${formatHours(visit.startDate)}-${formatHours(visit.endDate)}`}
          </Typography>
        </Box>
        <Typography className={classes.info}>{visit.status}</Typography>
      </Box>
      <Box>
        <Typography className={classes.title}>{visit.title}</Typography>
        <Typography className={classes.info}>{`Fecha: ${formatDate(
          visit.startDate
        )}`}</Typography>
        <Typography
          className={classes.info}
        >{`Empresa: ${visit.businessName.toUpperCase()}`}</Typography>
        <Typography className={classes.info}>
          {`Obra: ${visit.constructionName.toUpperCase()}`}
        </Typography>
        <Box
          mt={1}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems="center"
        >
          <Chip
            size="small"
            color="primary"
            label={`Jornada: ${visit.shiftName.toUpperCase()}`}
          ></Chip>
          <Box display={'flex'} alignItems={'center'}>
            <Typography className={classes.info}>
              {`${visit.assigned.names} ${visit.assigned.paternalSurname}`.toUpperCase()}
            </Typography>
            <Avatar className={classes.avatar}>{`${visit.assigned.names.charAt(
              0
            )}`}</Avatar>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

VisitCard.Loader = Loader

export default VisitCard

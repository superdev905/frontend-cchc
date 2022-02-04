import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'
import { formatCurrency, formatDate } from '../../../formatters'
import { COLORS } from '../../../utils/generateColor'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    backgroundColor: theme.palette.common.white,
    cursor: 'pointer',
    border: `2px solid transparent`,
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  avatar: {
    marginLeft: 5,
    backgroundColor: COLORS[0],
    textTransform: 'uppercase'
  },
  info: {
    fontSize: 14
  },
  loaderRoot: {
    height: 80,
    borderRadius: 15,
    width: '100%',
    transform: 'none'
  },
  date: {
    fontWeight: 'bold',
    fontSize: 40
  },
  month: {
    fontSize: 13
  },
  dateWrapper: {
    textAlign: 'center',
    borderRadius: 5,
    border: '1px solid'
  },
  infoWrapper: {
    marginLeft: 8
  }
}))

const Loader = () => {
  const classes = useStyles()
  return <Skeleton className={classes.loaderRoot}></Skeleton>
}

const DeliveredRow = ({ data }) => {
  const history = useHistory()
  const classes = useStyles()

  const handleOnClick = () => {
    history.push(`/benefits/${data.activity.benefit.id}`)
  }

  return (
    <Box p={1} className={classes.root} onClick={handleOnClick}>
      <Box display="flex" alignItems="center">
        <Box width={'50'} className={classes.dateWrapper} px={1}>
          <Typography className={classes.date}>
            {new Date(data.date).getDate()}
          </Typography>
          <Typography className={classes.month}>Octrube</Typography>
        </Box>
        <Box width={'100%'}>
          <Box className={classes.infoWrapper}>
            <Typography className={classes.info}>
              <strong>{data.activity.benefit.name}</strong> a{' '}
              <strong>{`${data.employeeName} ${data.employeeLastname}`}</strong>
            </Typography>
            <Typography className={classes.info}>
              {`Rut de trabajador: ${data.employeeRut}`}
            </Typography>
            <Typography className={classes.info}>
              {`Fecha: ${formatDate(data.date)}`}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
            >
              <Box>
                <Typography className={classes.info}>
                  {`Área: ${data.areaName}`}
                </Typography>
                <Typography className={classes.info}>
                  Costo:{' '}
                  <strong>{formatCurrency(data.activity.benefitCost)}</strong>
                </Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <Typography className={classes.info}>
                  {`${data.assistance.names} ${data.assistance.paternalSurname}`.toUpperCase()}
                </Typography>
                <Avatar
                  className={classes.avatar}
                >{`${data.assistance.names.charAt(0)}`}</Avatar>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

DeliveredRow.Loader = Loader

export default DeliveredRow

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft } from 'react-icons/fi'
import {
  Box,
  Drawer,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import unemployedActions from '../../../state/actions/unemployed'
import { LabeledRow, Text } from '../../UI'
import { months } from '../../../config'
import { formatDate } from '../../../formatters'
import { UserCard } from '../../Users'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 700
    }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  heading: {
    fontSize: '17px',
    fontWeight: 'bold',
    marginBottom: '10px'
  }
}))

const DialogPayment = ({ open, onClose, paymentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { isMobile } = useSelector((state) => state.ui)
  const { payment } = useSelector((state) => state.unemployed)

  const fetchDetails = () => {
    setLoading(true)
    dispatch(unemployedActions.getPayment(paymentId))
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const renderTitle = (values) => {
    if (values)
      return `${months.find((item) => item.index === values.month).name}-${
        values.period
      }`

    return ''
  }

  useEffect(() => {
    if (open) {
      fetchDetails()
    }
  }, [open])
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      classes={{ paper: classes.root }}
    >
      <Box px={3} py={4}>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton>
            <FiArrowLeft />
          </IconButton>
          <Typography className={classes.title}>
            {`Pago ${payment && renderTitle(payment)}`}
          </Typography>
        </Box>
        <Box mt={2} px={1}>
          <Box>
            <LabeledRow label="Mes:">
              <Text loading={loading}>
                {payment &&
                  months.find((item) => item.index === payment.month).name}
              </Text>
            </LabeledRow>
            <LabeledRow label="Año:">
              <Text loading={loading}>{payment?.period}</Text>
            </LabeledRow>
            <LabeledRow label="Fecha de registro:">
              <Text loaderWidth={'70%'} loading={loading}>{`${formatDate(
                payment?.date
              )}`}</Text>
            </LabeledRow>
          </Box>
          <Box mt={2}>
            <Typography className={classes.heading}>Beneficio</Typography>
            <LabeledRow label="Código:">
              <Text loading={loading}>{payment?.benefit?.code}</Text>
            </LabeledRow>
            <LabeledRow label="Nombre:">
              <Text loading={loading}>{payment?.benefit?.name}</Text>
            </LabeledRow>
          </Box>
          <Box mt={2}>
            <Typography className={classes.heading}>Assistente</Typography>
            {payment?.assistance && <UserCard user={payment.assistance} />}
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

export default DialogPayment

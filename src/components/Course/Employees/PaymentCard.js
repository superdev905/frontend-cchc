import {
  Box,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from '@material-ui/core'
import { FiTrash2 as DeleteIcon } from 'react-icons/fi'
import { formatCurrency, formatDate, formatText } from '../../../formatters'
import { useToggle } from '../../../hooks'
import { FileThumbnail, FileVisor } from '../../Shared'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: `1px solid ${theme.palette.common.black}`,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative'
  },
  deleteIcon: {
    color: theme.palette.error.main
  },
  actions: {
    position: 'absolute',
    top: 10,
    right: 10,
    '& button': {
      padding: 5,
      color: theme.palette.primary.main
    }
  },
  tag: {
    fontSize: 15,
    opacity: 0.8
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 15,
    opacity: 0.8
  },
  billed: {
    marginBottom: 8
  }
}))

const EmployeePayment = ({ payment }) => (
  <Box>
    <Typography>{`Número de boleta: ${payment.ticketNumber}`}</Typography>
    <Typography>{`Abono: ${formatCurrency(
      payment.paymentEmployee
    )}`}</Typography>
  </Box>
)
const FoundationPayment = ({ payment }) => (
  <Box>
    <Typography>{`Abono: ${formatCurrency(
      payment.paymentFundation
    )}`}</Typography>
  </Box>
)
const BusinessPayment = ({ payment }) => {
  const classes = useStyles()
  const { open, toggleOpen } = useToggle()
  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
          <Typography className={classes.tag}>Número de factura:</Typography>
          <Typography className={classes.info}>
            {payment.invoiceNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.tag} align="right">
            Abono:{' '}
          </Typography>
          <Typography className={classes.info} align="right">
            {formatCurrency(payment.paymentBusiness)}
          </Typography>
        </Grid>
      </Grid>
      <Box marginTop={'10px'}>
        <FileThumbnail
          fileName={payment.invoiceAttachment.fileName}
          fileSize={payment.invoiceAttachment.fileSize}
          date={payment.invoiceAttachment.uploadDate}
          onView={toggleOpen}
        />
        {open && (
          <FileVisor
            open={open}
            onClose={toggleOpen}
            src={payment.invoiceAttachment.fileUrl}
            filename={payment.invoiceAttachment.fileName}
          />
        )}
      </Box>
    </Box>
  )
}

const PaymentCard = ({ payment, onDelete }) => {
  const classes = useStyles()

  const renderDetails = (billedType) => {
    const list = {
      TRABAJADOR: <EmployeePayment payment={payment} />,
      EMPRESA: <BusinessPayment payment={payment} />,
      FUNDACIÓN: <FoundationPayment payment={payment} />
    }
    return list[billedType]
  }

  return (
    <Box className={classes.root} p={2}>
      <Typography className={classes.date}>{`Fecha: ${formatDate(payment.date, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`}</Typography>
      <Typography className={classes.billed}>
        Facturación a: {formatText.capitalizeString(payment.billedTarget)}
      </Typography>
      <Box className={classes.actions}>
        <IconButton onClick={onDelete}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </Box>
      <Box>{renderDetails(payment.billedTarget)}</Box>
    </Box>
  )
}

export default PaymentCard

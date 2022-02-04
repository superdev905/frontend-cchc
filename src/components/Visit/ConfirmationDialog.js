import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import employeeActions from '../../state/actions/employees'
import { Dialog } from '../Shared'
import { Button } from '../UI'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 5,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  content: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 5,
    textAlign: 'left'
  }
}))

const ConfirmationDialog = ({
  open,
  onClose,
  onCloseJobs,
  onCloseAssistence,
  employeeNames,
  employeeRun,
  employeeId
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isMobile } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const applyConfirmation = () => {
    try {
      const formData = {
        employeeId,
        assistanceId: user.id,
        date: new Date().toISOString()
      }
      dispatch(
        employeeActions.createEmployeeRevision(employeeId, formData)
      ).then(() => {
        onCloseJobs()
        onClose()
        onCloseAssistence()
      })
    } catch (err) {
      enqueueSnackbar(err, { variant: 'error' })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth="md" fullScreen={isMobile}>
      <Box textAlign={'center'}>
        <Typography className={classes.title}>Confirmación de Datos</Typography>
        <Typography className={classes.content}>
          Yo{' '}
          <b>
            {user.names} {user.paternal_surname} {user.maternal_surname}
          </b>{' '}
          declaro que todos los datos en la ficha del trabajador con nombre:{' '}
          <b>{employeeNames}</b> y rut: <b>{employeeRun}</b> son fidedignos.
        </Typography>
        <Button onClick={applyConfirmation}>Confirmar</Button>
      </Box>
    </Dialog>
  )
}

export default ConfirmationDialog

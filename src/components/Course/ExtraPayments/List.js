import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useToggle, useSuccess } from '../../../hooks'
import { Button } from '../../UI'
import ExtraPayments from './ExtraPayments'
import coursesActions from '../../../state/actions/courses'
import ExtraPaymentsCard from './Card'

const ExtraPaymentsList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentExtraPayment] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()

  console.log(loading)

  const createExtraPayment = (values) => {
    dispatch(
      coursesActions.createExtraPayment({
        ...values
      })
    )
      .then(() => {
        setLoading(false)
        changeSuccess(true)
        toggleOpenAdd()
        enqueueSnackbar('Pago agregado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const deleteExtraPayment = (id) => {
    dispatch(
      coursesActions.patchExtraPayment(id, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)
        changeSuccess(true)
        toggleOpenDelete()
        enqueueSnackbar('Pago eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Gastos Extras
        </Typography>
        <Button onClick={toggleOpenAdd}> Agregar </Button>
      </Box>
      <Grid item xs={12} md={12}>
        <ExtraPaymentsCard />
      </Grid>

      <ExtraPayments
        open={openAdd}
        onClose={toggleOpenAdd}
        submitFunction={createExtraPayment}
      />

      {currentExtraPayment && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          onConfirm={() => deleteExtraPayment(currentExtraPayment.id)}
          message={
            <Typography variant="h6">
              ¿Estás seguro de eliminar este pago?
            </Typography>
          }
          loading={deleting}
          success={success}
        />
      )}
    </Box>
  )
}
export default ExtraPaymentsList

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Box, Typography } from '@material-ui/core'
import coursesActions from '../../../state/actions/courses'
import OTECPaymentCard from './Card'
import OTECPaymentDialog from './Dialog'
import { useSuccess, useToggle } from '../../../hooks'
import { Button, EmptyState } from '../../UI'
import { ConfirmDelete, FileVisor } from '../../Shared'

const PaymentsList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const [currentPayment, setCurrentPayment] = useState(null)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchPayments = () => {
    setLoading(true)
    dispatch(
      coursesActions.getOTECPayments({ size: 30, page: 1, courseId: idCourse })
    )
      .then((result) => {
        setLoading(false)
        setPayments(result.items)
      })
      .catch(() => {
        setLoading(false)
        setPayments([])
      })
  }

  const createPayment = (values) =>
    dispatch(
      coursesActions.createOTECPayment({ ...values, courseId: idCourse })
    )

  const deletePayment = (id) => {
    setDeleting(true)
    dispatch(coursesActions.patchOTECPayment(id, { state: 'DELETED' }))
      .then(() => {
        setDeleting(false)
        enqueueSnackbar('Pago a OTEC eliminado', { variant: 'success' })
        changeSuccess(true, () => {
          toggleOpenDelete()
          fetchPayments()
        })
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: 'error' })
        setDeleting(false)
        toggleOpenDelete()
      })
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Pagos a OTEC
        </Typography>
        <Button onClick={toggleOpenAdd}>Agregar</Button>
      </Box>
      <Box>
        {loading ? (
          <>
            <OTECPaymentCard.Loader />
            <OTECPaymentCard.Loader />
          </>
        ) : (
          <>
            {payments.length === 0 ? (
              <EmptyState message="Este curso no tiene ningún pago a OTEC" />
            ) : (
              payments.map((item) => (
                <OTECPaymentCard
                  payment={item}
                  key={`payment-card-${item.id}`}
                  onView={(file) => {
                    setCurrentFile(file)
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    setCurrentPayment(item)
                    toggleOpenDelete()
                  }}
                />
              ))
            )}
          </>
        )}
      </Box>
      {openAdd && (
        <OTECPaymentDialog
          submitFunction={createPayment}
          successFunction={fetchPayments}
          open={openAdd}
          successMessage="Pago a OTEC registrado"
          onClose={toggleOpenAdd}
        />
      )}
      {currentFile && openVisor && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          filename={currentFile.fileName}
          src={currentFile.fileUrl}
        />
      )}
      {currentPayment && openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleOpenDelete}
          success={success}
          loading={deleting}
          message={
            <Box>
              <Typography variant="h6" align="center">
                ¿Estás seguro de eliminar este pago?
              </Typography>
              <Typography
                variant="h6"
                align="center"
                style={{ fontWeight: 'bold' }}
              >{`Factura N°: ${currentPayment.invoiceNumber}`}</Typography>
            </Box>
          }
          onConfirm={() => deletePayment(currentPayment.id)}
        />
      )}
    </Box>
  )
}
export default PaymentsList

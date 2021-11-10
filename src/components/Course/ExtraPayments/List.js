import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useToggle, useSuccess } from '../../../hooks'
import { Button, EmptyState } from '../../UI'
import ExtraPayments from './ExtraPayments'
import coursesActions from '../../../state/actions/courses'
import ExtraPaymentCard from './Card'
import { ConfirmDelete, FileVisor } from '../../Shared'
import files from '../../../state/actions/files'

const ExtraPaymentsList = () => {
  const dispatch = useDispatch()
  const { idCourse } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentFile, setCurrentFile] = useState(null)
  const [currentExtraPayment, setCurrentExtraPayment] = useState(null)
  const { success, changeSuccess } = useSuccess()
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openVisor, toggleOpen: toggleOpenVisor } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { extraPaymentsList } = useSelector((state) => state.courses)

  const fetchExtraPayments = () => {
    setLoading(true)
    dispatch(coursesActions.getExtraPayments({ courseId: idCourse })).then(
      () => {
        setLoading(false)
      }
    )
  }

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
        fetchExtraPayments()
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
        fetchExtraPayments()
        enqueueSnackbar('Pago eliminado exitosamente', {
          autoHideDuration: 1500,
          variant: 'success'
        })
      })
      .catch(() => {
        setDeleting(false)
      })
  }

  useEffect(() => {
    fetchExtraPayments()
  }, [])

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
      <Box>
        {loading ? (
          <>
            <ExtraPaymentCard.Container>
              <ExtraPaymentCard.Loader />
              <ExtraPaymentCard.Loader />
            </ExtraPaymentCard.Container>
          </>
        ) : (
          <ExtraPaymentCard.Container>
            {extraPaymentsList.length === 0 ? (
              <EmptyState message="Este curso no tiene ningún pago a OTEC" />
            ) : (
              extraPaymentsList.map((item) => (
                <ExtraPaymentCard
                  payment={item}
                  key={`payment-card-${item.id}`}
                  onView={(file) => {
                    setCurrentFile(file)
                    toggleOpenVisor()
                  }}
                  onDelete={() => {
                    setCurrentExtraPayment(item)
                    toggleOpenDelete()
                  }}
                  onDownload={() => {
                    dispatch(
                      files.downloadFile(item.file.fileUrl, item.file.fileName)
                    )
                  }}
                />
              ))
            )}
          </ExtraPaymentCard.Container>
        )}
      </Box>

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

      {currentFile && openVisor && (
        <FileVisor
          open={openVisor}
          onClose={toggleOpenVisor}
          filename={currentFile.fileName}
          src={currentFile.fileUrl}
        />
      )}
    </Box>
  )
}
export default ExtraPaymentsList

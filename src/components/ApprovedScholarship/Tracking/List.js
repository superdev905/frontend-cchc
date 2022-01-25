import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import approvedActions from '../../../state/actions/approvedScholarship'
import { useSuccess, useToggle } from '../../../hooks'
import { ConfirmDelete } from '../../Shared'
import TrackingDialog from './Dialog'
import TableTracking from './Table'
import { Button, EmptyState } from '../../UI'

const TrackingList = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [currentTracking, setCurrentTracking] = useState(null)
  const { approvedScholarship: details } = useSelector(
    (state) => state.scholarships
  )
  console.log(details)
  const { open: openAdd, toggleOpen: toggleOpenAdd } = useToggle()
  const { open: openEdit, toggleOpen: toggleOpenEdit } = useToggle()
  const { open: openDelete, toggleOpen: toggleOpenDelete } = useToggle()
  const { success, changeSuccess } = useSuccess()

  const fetchTrackingList = () => {
    const { scholarshipType } = details.postulation
    const query = {
      approvedId: details.id,
      scholarshipType: details.postulation.scholarshipType.key
    }
    setLoading(true)
    dispatch(approvedActions.getTrackingList(scholarshipType.key, query))
      .then((res) => {
        setLoading(false)
        setItems(res.items)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const createTracking = (values) => {
    const { scholarshipType } = details.postulation
    const data = {
      ...values,
      date: new Date().toISOString(),
      approvedScholarshipId: details.id
    }
    return dispatch(approvedActions.createTracking(scholarshipType.key, data))
  }

  const updateTracking = (values) => {
    const { scholarshipType } = details.postulation
    return dispatch(
      approvedActions.updateTracking(currentTracking.id, scholarshipType.key, {
        ...values,
        approvedScholarshipId: currentTracking.approvedScholarshipId
      })
    )
  }
  const deleteTracking = (id) => {
    const { scholarshipType } = details.postulation
    setDeleting(true)
    dispatch(
      approvedActions.patchTracking(id, scholarshipType.key, {
        state: 'DELETED'
      })
    )
      .then(() => {
        setDeleting(false)

        changeSuccess(true, () => {
          fetchTrackingList()
          toggleOpenDelete()
          enqueueSnackbar('Seguimiento eliminado', { variant: 'success' })
        })
      })
      .catch((err) => {
        setDeleting(false)
        enqueueSnackbar(err, { variant: 'success' })
      })
  }

  useEffect(() => {
    if (details) {
      fetchTrackingList()
    }
  }, [details])

  return (
    <Box p={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Seguimiento
        </Typography>
        <Button onClick={toggleOpenAdd}>Nuevo</Button>
      </Box>
      <Box>
        {items.length === 0 ? (
          <EmptyState message="Esta beca aprobada no tiene seguimiento registrado" />
        ) : (
          <>
            {details && (
              <TableTracking
                type={details.postulation.scholarshipType.key}
                list={items}
                loading={loading}
                onEdit={(item) => {
                  toggleOpenEdit()
                  setCurrentTracking(item)
                }}
                onDelete={(item) => {
                  toggleOpenDelete()
                  setCurrentTracking(item)
                }}
              />
            )}
          </>
        )}

        {openAdd && details && (
          <TrackingDialog
            open={openAdd}
            onClose={toggleOpenAdd}
            scholarshipType={details.postulation.scholarshipType.key}
            benefitId={details.id}
            submitFunction={createTracking}
            successMessage={'Seguimiento creado'}
            successFunction={fetchTrackingList}
          />
        )}
        {openEdit && details && currentTracking && (
          <TrackingDialog
            type="UPDATE"
            data={currentTracking}
            open={openEdit}
            onClose={toggleOpenEdit}
            scholarshipType={details.postulation.scholarshipType.key}
            submitFunction={updateTracking}
            successMessage={'Seguimiento actualizado'}
            successFunction={fetchTrackingList}
          />
        )}
        {openDelete && details && currentTracking && (
          <ConfirmDelete
            open={openDelete}
            onConfirm={() => deleteTracking(currentTracking.id)}
            loading={deleting}
            success={success}
            message={
              <Typography variant="h6" align="center">
                ¿Estás seguro de eliminar este seguimiento?
              </Typography>
            }
            onClose={toggleOpenDelete}
          />
        )}
      </Box>
    </Box>
  )
}

export default TrackingList
